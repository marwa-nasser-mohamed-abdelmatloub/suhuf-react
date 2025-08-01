import React from 'react';
import { useTheme } from '../shared/ThemeProvider';

const ServicesSection = () => {
    const theme = useTheme();

    const services = [
        { icon: "bi-journal-text", title: "تلاوة القرآن الكريم", desc: "تعلم التلاوة الصحيحة مع أحكام التجويد بسهولة من المنزل." },
        { icon: "bi-book", title: "نوراني القاعدة أونلاين", desc: "دروس تفاعلية لتعلم القاعدة النورانية للأطفال والكبار." },
        { icon: "bi-laptop", title: "تعلم القرآن أونلاين", desc: "نوفر حصص أونلاين مباشرة مع المعلمين والمعلمات المؤهلين." },
        { icon: "bi-translate", title: "ترجمة معاني القرآن", desc: "تعلم معاني القرآن الكريم بلغات مختلفة لفهم أعمق للآيات." },
        { icon: "bi-journal-richtext", title: "القرآن بالتجويد", desc: "تعلم قراءة القرآن الكريم وفق أحكام التجويد الصحيحة." },
        { icon: "bi-person-check", title: "معلمة قرآن للنساء", desc: "نوفر معلمات متخصصات لتعليم القرآن الكريم للنساء." },
    ];

    return (
        <section className="text-center py-5" style={{ direction: 'rtl', backgroundColor: theme.secondary }}>
            <div className="container">
                <h6 style={{ color: theme.primary }}>خدماتنا</h6>
                <h2 className="fw-bold mb-3" style={{ color: theme.text }}>
                    أكاديمية القرآن للجميع
                </h2>
                <p className="mb-5 text-muted">
                    نوفر مجموعة متكاملة من خدمات تعليم القرآن الكريم أونلاين مع معلمين ومعلمات محترفين.
                </p>

                <div className="row g-4">
                    {services.map((service, index) => (
                        <div className="col-md-4 col-sm-6" key={index}>
                            <div className="d-flex flex-column align-items-center p-3">
                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center mb-3"
                                    style={{
                                        backgroundColor: theme.primary,
                                        width: '70px',
                                        height: '70px',
                                        color: theme.light,
                                        fontSize: '30px'
                                    }}
                                >
                                    <i className={`bi ${service.icon}`}></i>
                                </div>
                                <h5 className="fw-bold mb-2">{service.title}</h5>
                                <p className="text-muted">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
