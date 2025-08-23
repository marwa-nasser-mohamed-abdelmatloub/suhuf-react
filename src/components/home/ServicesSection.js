import React from 'react';
import { useTheme } from '../shared/ThemeProvider';

const ServicesSection = () => {
    const theme = useTheme();

    const services = [
      {
        icon: "bi-bullseye",
        title: "برنامج الحفظ والمراجعة",
        desc: "خطط منظمة لحفظ القرآن الكريم أو أجزائه، مع متابعة أسبوعية لضمان تثبيت الحفظ.",
      },
      {
        icon: "bi-people",
        title: "حصص أونلاين (فردية أو جماعية)",
        desc: "اختر ما يناسبك: حصص فردية بمتابعة شخصية، أو حصص جماعية تفاعلية مع زملائك لزيادة الحافز.",
      },
      {
        icon: "bi-book",
        title: "تصحيح التلاوة والتجويد",
        desc: "متابعة مباشرة مع المعلم لتصحيح التلاوة خطوة بخطوة، مع تطبيق عملي لأحكام التجويد حتى الإتقان.",
      },
      {
        icon: "bi-pencil-square",
        title: "برنامج القراءة من الصفر",
        desc: "تأسيس المبتدئين على الحروف والمخارج والحركات حتى يتمكنوا من قراءة القرآن بطلاقة.",
      },
      {
        icon: "bi-moon-stars",
        title: "قسم الإسلاميات",
        desc: "حصص في التفسير والفقه والسيرة النبوية بأسلوب مبسط يناسب الكبار والصغار.",
      },
    ];

    return (
        <section className="text-center py-5" style={{ direction: 'rtl', backgroundColor: theme.light }}>
            <div className="container">
                <h6 style={{ color: theme.primary }}>خدماتنا</h6>
                <h2 className="fw-bold mb-3" style={{ color: theme.text }}>
                    أكاديمية القرآن للجميع
                </h2>
                <p className="mb-5 text-muted">
                    نوفر مجموعة متكاملة من برامج تعليم القرآن الكريم أونلاين مع معلمين ومعلمات محترفين.
                </p>

                <div className="row g-4">
                    {services.map((service, index) => (
                        <div
                            className={`col-md-6 col-sm-6 ${index === services.length - 1 ? "mx-auto" : ""}`}
                            key={index}
                        >
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
