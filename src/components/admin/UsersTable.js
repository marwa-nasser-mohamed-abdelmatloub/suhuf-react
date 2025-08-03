import React, { useState } from 'react';
import { Card, Table, Form, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import UserForm from './UserForm';
import { deleteUser, registerUser, updateUser } from '../../services/api';
import PrimaryButton from '../shared/PrimaryButton';
import ConfirmationModal from './ConfirmationModal';

const UsersTable = ({ users, refreshUsers, onCreate, onUpdate }) => {
    const theme = useTheme();
    const [showForm, setShowForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userTypeFilter, setUserTypeFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesType = true;
        if (userTypeFilter === 'student') {
            matchesType = user.is_student;
        } else if (userTypeFilter === 'teacher') {
            matchesType = user.is_quran_teacher;
        } else if (userTypeFilter === 'other') {
            matchesType = !user.is_student && !user.is_quran_teacher;
        }

        return matchesSearch && matchesType;
    });

    const handleEdit = (user) => {
        setCurrentUser({
            id: user.id,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            phone_number: user.phone_number,
            is_student: user.is_student,
            is_quran_teacher: user.is_quran_teacher,
            credit: user.credit
        });
        setShowForm(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteUser(userToDelete.id);
            setShowDeleteModal(false);
            refreshUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(error.message || 'حدث خطأ أثناء حذف المستخدم');
        }
    };

    const handleUserSubmit = async (userData) => {
        setIsSubmitting(true);
        try {
            if (userData.id) {
                const updateData = { ...userData };
                delete updateData.password;
                delete updateData.confirm_password;
                await updateUser(userData.id, updateData);
            } else {
                await registerUser(userData);
            }
            setShowForm(false);
            refreshUsers();
        } catch (error) {
            alert(error.message || 'حدث خطأ أثناء حفظ المستخدم');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getUserTypeBadge = (user) => {
        if (user.is_quran_teacher) {
            return <Badge bg="info">مدرس</Badge>;
        } else if (user.is_student) {
            return <Badge bg="success">طالب</Badge>;
        } else {
            return <Badge bg="secondary">غير محدد</Badge>;
        }
    };

    return (
        <Card className="shadow-sm mb-4 w-100">
            <Card.Body>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-2 gap-md-0">
                    <h5 style={{ color: theme.primary, fontSize: '1.1rem' }} className="mb-2 mb-md-0">
                        <i className="fas fa-users ms-2"></i>
                        قائمة المستخدمين
                    </h5>
                    <PrimaryButton onClick={() => { setCurrentUser(null); setShowForm(true); }}>
                        <i className="fas fa-plus ms-2"></i>
                        إضافة مستخدم
                    </PrimaryButton>
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-between mb-4 gap-2 gap-md-3">
                    <InputGroup className="w-100 w-md-25 mb-2 mb-md-0" style={{ maxWidth: 350 }}>
                        <InputGroup.Text style={{ background: theme.light }}>
                            <i className="fas fa-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="ابحث عن مستخدم..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>

                    <Dropdown className="w-100 w-md-auto">
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter" className="w-100 w-md-auto">
                            <i className="fas fa-filter ms-2"></i>
                            {userTypeFilter === 'student' ? 'طلاب' :
                                userTypeFilter === 'teacher' ? 'مدرسين' :
                                    userTypeFilter === 'other' ? 'آخرون' : 'جميع الأنواع'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setUserTypeFilter('')}>الكل</Dropdown.Item>
                            <Dropdown.Item onClick={() => setUserTypeFilter('student')}>طلاب</Dropdown.Item>
                            <Dropdown.Item onClick={() => setUserTypeFilter('teacher')}>مدرسين</Dropdown.Item>
                            <Dropdown.Item onClick={() => setUserTypeFilter('other')}>آخرون</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {filteredUsers.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <i className="fas fa-user-slash fa-3x mb-3" style={{ color: theme.muted }}></i>
                        <div>لا يوجد مستخدمين متطابقين مع البحث</div>
                    </div>
                ) : (
                    <div className="table-responsive w-100" style={{ overflowX: 'auto', minWidth: 0 }}>
                        <Table striped bordered hover className="text-center align-middle mb-0 w-100" style={{ minWidth: '100%', tableLayout: 'auto' }}>
                            <thead style={{ background: theme.primary, color: theme.light }}>
                                <tr>
                                    <th style={{ whiteSpace: 'nowrap', minWidth: 40 }}>#</th>
                                    <th style={{ minWidth: 80, wordBreak: 'break-word', overflowWrap: 'break-word' }}>الاسم</th>
                                    <th style={{ minWidth: 100, wordBreak: 'break-word', overflowWrap: 'break-word' }}>البريد</th>
                                    <th style={{ minWidth: 80, wordBreak: 'break-word', overflowWrap: 'break-word' }}>رقم الهاتف</th>
                                    <th style={{ minWidth: 70, wordBreak: 'break-word', overflowWrap: 'break-word' }}>نوع المستخدم</th>
                                    <th style={{ minWidth: 60, wordBreak: 'break-word', overflowWrap: 'break-word' }}>الرصيد</th>
                                    <th style={{ minWidth: 70, wordBreak: 'break-word', overflowWrap: 'break-word' }}>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, idx) => (
                                    <tr key={user.id}>
                                        <td>{idx + 1}</td>
                                        <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: 120 }}>{user.full_name || user.username}</td>
                                        <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: 150 }}>{user.email}</td>
                                        <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: 100 }}>{user.phone_number || '-'}</td>
                                        <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: 90 }}>{getUserTypeBadge(user)}</td>
                                        <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: 80 }}>{user.credit || 0} ر.س</td>
                                        <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: 90 }}>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="link" id="dropdown-actions">
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleEdit(user)}>
                                                        <i className="fas fa-edit ms-2"></i>
                                                        تعديل
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDeleteClick(user)}>
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

                <UserForm
                    show={showForm}
                    handleClose={() => setShowForm(false)}
                    handleSubmit={handleUserSubmit}
                    initialData={currentUser || {}}
                    isEdit={!!currentUser}
                    isSubmitting={isSubmitting}
                />

                <ConfirmationModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    title="حذف المستخدم"
                    message={`هل أنت متأكد من رغبتك في حذف المستخدم "${userToDelete?.username}"؟`}
                />
            </Card.Body>
        </Card>
    );
};

export default UsersTable;