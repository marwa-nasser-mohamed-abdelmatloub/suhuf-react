import React, { useState } from 'react';
import { Card, Table, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { useTheme } from '../../components/shared/ThemeProvider';
import ProgramForm from './ProgramForm';
import Swal from 'sweetalert2';
import { deleteProgram, createProgram, updateProgram } from '../../services/api';
import PrimaryButton from '../../components/shared/PrimaryButton';

const ProgramsTable = ({ programs, refreshPrograms }) => {
    const theme = useTheme();
    const [showForm, setShowForm] = useState(false);
    const [currentProgram, setCurrentProgram] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (program) => {
        setCurrentProgram(program);
        setShowForm(true);
    };

    const handleDeleteClick = async (program) => {
        const result = await Swal.fire({
            title: 'حذف البرنامج',
            text: `هل أنت متأكد من رغبتك في حذف البرنامج "${program.title}"؟`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذف',
            cancelButtonText: 'إلغاء',
            reverseButtons: true
        });
        if (result.isConfirmed) {
            try {
                await deleteProgram(program.id);
                await refreshPrograms();
                Swal.fire({
                    title: 'تم الحذف!',
                    text: 'تم حذف البرنامج بنجاح.',
                    icon: 'success',
                    confirmButtonText: 'موافق'
                });
            } catch (err) {
                Swal.fire({
                    title: 'خطأ',
                    text: 'حدث خطأ أثناء حذف البرنامج.',
                    icon: 'error',
                    confirmButtonText: 'موافق'
                });
            }
        }
    };

    const handleCreateProgram = async (programData) => {
        try {
            await createProgram(programData);
            await refreshPrograms();
            setShowForm(false);
        } catch (err) {
            console.error('Create failed', err);
        }
    };

    const handleUpdateProgram = async (programData) => {
        try {
            await updateProgram(programData.id, programData);
            await refreshPrograms();
            setShowForm(false);
        } catch (err) {
            console.error('Update failed', err);
        }
    };

    const filteredPrograms = programs.filter(program => {
        return (program.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (program.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <Card className="shadow-sm mb-4 w-100">
            <Card.Body>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-2 gap-md-0">
                    <h5 style={{ color: theme.primary, fontSize: '1.1rem' }} className="mb-2 mb-md-0">
                        <i className="fas fa-calendar-alt ms-2"></i>
                        قائمة البرامج
                    </h5>
                    <PrimaryButton onClick={() => { setCurrentProgram(null); setShowForm(true); }}>
                        <i className="fas fa-plus ms-2"></i>
                        إضافة برنامج
                    </PrimaryButton>
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-between mb-4 gap-2 gap-md-3">
                    <InputGroup className="w-100 w-md-25 mb-2 mb-md-0" style={{ maxWidth: 350 }}>
                        <InputGroup.Text style={{ background: theme.light }}>
                            <i className="fas fa-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="ابحث عن برنامج..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </div>

                {filteredPrograms.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <i className="fas fa-calendar-times fa-3x mb-3" style={{ color: theme.muted }}></i>
                        <div>لا توجد برامج متاحة</div>
                    </div>
                ) : (
                    <div className="table-responsive w-100">
                        <Table striped bordered hover className="text-center align-middle mb-0 w-100">
                            <thead style={{ background: theme.primary, color: theme.light }}>
                                <tr>
                                    <th>#</th>
                                    <th>اسم البرنامج</th>
                                    <th>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPrograms.map((program, idx) => (
                                    <tr key={program.id}>
                                        <td>{idx + 1}</td>
                                        <td>{program.name}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="link" id="dropdown-actions">
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleEdit(program)}>
                                                        <i className="fas fa-edit ms-2"></i>
                                                        تعديل
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDeleteClick(program)}>
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

                <ProgramForm
                    show={showForm}
                    handleClose={() => setShowForm(false)}
                    initialData={currentProgram || {}}
                    isEdit={!!currentProgram}
                    onCreate={handleCreateProgram}
                    onUpdate={handleUpdateProgram}
                />
            </Card.Body>
        </Card>
    );
};

export default ProgramsTable;