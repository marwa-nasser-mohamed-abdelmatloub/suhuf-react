import React, { useState } from 'react';
import { Card, Table, Form, InputGroup, Dropdown, Badge } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import CourseForm from './CourseForm';
import ConfirmationModal from './ConfirmationModal';
import { deleteCourse, createCourse, updateCourse } from '../../services/api';
import PrimaryButton from '../shared/PrimaryButton';

const CoursesTable = ({ courses, refreshCourses }) => {
    const theme = useTheme();
    const [showForm, setShowForm] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    const getLevelBadge = (level) => {
        const levelMap = {
            beginner: <Badge bg="success">مبتدئ</Badge>,
            intermediate: <Badge bg="warning" text="dark">متوسط</Badge>,
            advanced: <Badge bg="danger">متقدم</Badge>
        };
        return levelMap[level] || '-';
    };

    const handleEdit = (course) => {
        setCurrentCourse(course);
        setShowForm(true);
    };

    const handleDeleteClick = (course) => {
        setCourseToDelete(course);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteCourse(courseToDelete.id);
            await refreshCourses();
        } catch (err) {
            console.error('Delete failed', err);
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleCreateCourse = async (courseData) => {
        try {
            await createCourse(courseData);
            await refreshCourses();
            setShowForm(false);
        } catch (err) {
            console.error('Create failed', err);
        }
    };

    const handleUpdateCourse = async (courseData) => {
        try {
            await updateCourse(courseData.id, courseData);
            await refreshCourses();
            setShowForm(false);
        } catch (err) {
            console.error('Update failed', err);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.instructor && course.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesLevel = levelFilter === '' || course.level === levelFilter;
        return matchesSearch && matchesLevel;
    });

    return (
        <Card className="shadow-sm mb-4 w-100">
            <Card.Body>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-2 gap-md-0">
                    <h5 style={{ color: theme.primary, fontSize: '1.1rem' }} className="mb-2 mb-md-0">
                        <i className="fas fa-book ms-2"></i>
                        قائمة الكورسات
                    </h5>
                    <PrimaryButton onClick={() => { setCurrentCourse(null); setShowForm(true); }}>
                        <i className="fas fa-plus ms-2"></i>
                        إضافة كورس
                    </PrimaryButton>
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-between mb-4 gap-2 gap-md-3">
                    <InputGroup className="w-100 w-md-25 mb-2 mb-md-0" style={{ maxWidth: 350 }}>
                        <InputGroup.Text style={{ background: theme.light }}>
                            <i className="fas fa-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="ابحث عن كورس أو مدرب..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>

                    <Dropdown className="w-100 w-md-auto">
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter" className="w-100 w-md-auto">
                            <i className="fas fa-filter ms-2"></i>
                            {levelFilter ? (
                                levelFilter === 'beginner' ? 'مبتدئ' :
                                    levelFilter === 'intermediate' ? 'متوسط' :
                                        'متقدم'
                            ) : 'تصفية حسب المستوى'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setLevelFilter('')}>الكل</Dropdown.Item>
                            <Dropdown.Item onClick={() => setLevelFilter('beginner')}>مبتدئ</Dropdown.Item>
                            <Dropdown.Item onClick={() => setLevelFilter('intermediate')}>متوسط</Dropdown.Item>
                            <Dropdown.Item onClick={() => setLevelFilter('advanced')}>متقدم</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {filteredCourses.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <i className="fas fa-book-open fa-3x mb-3" style={{ color: theme.muted }}></i>
                        <div>لا توجد كورسات متاحة</div>
                    </div>
                ) : (
                    <div className="table-responsive w-100">
                        <Table striped bordered hover className="text-center align-middle mb-0 w-100" style={{ minWidth: '100%', tableLayout: 'auto' }}>
                            <thead style={{ background: theme.primary, color: theme.light }}>
                                <tr>
                                    <th>#</th>
                                    <th>اسم الكورس</th>
                                    <th>المدرب</th>
                                    <th>المستوى</th>
                                    <th>السعر</th>
                                    <th>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.map((course, idx) => (
                                    <tr key={course.id}>
                                        <td>{idx + 1}</td>
                                        <td>{course.title}</td>
                                        <td>{course.instructor || '-'}</td>
                                        <td>{getLevelBadge(course.level)}</td>
                                        <td>{course.price} ريال</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="link" id="dropdown-actions">
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleEdit(course)}>
                                                        <i className="fas fa-edit ms-2"></i>
                                                        تعديل
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDeleteClick(course)}>
                                                        <i className="fas fa-trash ms-2"></i>
                                                        حذف
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}

                <CourseForm
                    show={showForm}
                    handleClose={() => setShowForm(false)}
                    initialData={currentCourse || {}}
                    isEdit={!!currentCourse}
                    onCreate={handleCreateCourse}
                    onUpdate={handleUpdateCourse}
                />

                <ConfirmationModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    title="حذف الكورس"
                    message={`هل أنت متأكد من رغبتك في حذف الكورس "${courseToDelete?.title}"؟`}
                />
            </Card.Body>
        </Card>
    );
};

export default CoursesTable;
