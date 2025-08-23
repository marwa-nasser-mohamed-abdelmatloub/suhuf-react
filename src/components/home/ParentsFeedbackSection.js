import React from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import { useTheme } from "../shared/ThemeProvider";

import review1 from "../../assets/images/review1.jpg";
import review2 from "../../assets/images/review2.jpg";
import review3 from "../../assets/images/review3.jpg";
import review4 from "../../assets/images/review4.jpg";
import review5 from "../../assets/images/review5.jpg";
import review6 from "../../assets/images/review6.jpg";
import review7 from "../../assets/images/review7.jpg";
import AnimatedTitle from "../shared/AnimatedTitle";

const testimonials = [
    { id: 1, image: review1, title: "تجربة تعليمية مميزة", feedback: "كانت الحصة ممتعة وهادفة، والأطفال استمتعوا كثيرًا بأجواء التعلم." },
    { id: 2, image: review2, title: "المعلمة ممتازة", feedback: "المعلمة ممتازة جدًا وبتتعامل مع الأطفال بحب وصبر كبير." },
    { id: 3, image: review3, title: "المعلمة مميزة والحصة ممتعة", feedback: "الحصة كانت أكثر من رائعة، والمعلمة تمتاز بالأسلوب الراقي والتعامل المميز مع الأطفال." },
    { id: 4, image: review4, title: "تحفيز مميز", feedback: "طريقة التدريس محفزة جدًا للأطفال." },
    { id: 5, image: review5, title: "أجواء ودية", feedback: "الأجواء تعليمية وودية في نفس الوقت." },
    { id: 6, image: review6, title: "حماس للحفظ", feedback: "ابني صار يتسابق لحفظ السور قبل موعد الحصة." },
    { id: 7, image: review7, title: "أنصح بها", feedback: "التجربة رائعة وأنصح الجميع بها." }
];

const ParentsFeedbackSection = () => {
    const theme = useTheme();

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        rtl: true,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    };

    let sliderRef = React.useRef(null);

    return (
      <section
        style={{
          backgroundColor: theme.light,
          padding: "60px 0",
          direction: "rtl",
        }}
      >
        <Container>
          <AnimatedTitle level={2}>
            آراء أولياء الأمور
          </AnimatedTitle>

          <div className="feedback-slider-wrapper">
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((t) => (
                <div key={t.id}>
                  <div
                    className="cardd"
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                      padding: "30px",
                      margin: "10px",
                      textAlign: "center",
                      minHeight: "400px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: "100%",
                        maxWidth: "350px",
                        aspectRatio: "16/9",
                        overflow: "hidden",
                        border: `1px solid ${theme.primary}`,
                        borderRadius: "12px",
                      }}
                    >
                      <img
                        src={t.image}
                        alt={`testimonial-${t.id}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                        }}
                      />
                    </div>

                    <h5 className="fw-bold" style={{ color: theme.text }}>
                      {t.title}
                    </h5>
                    <p className="text-muted">{t.feedback}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </Container>

        <div className="d-flex justify-content-center mt-4">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            style={{
              background: theme.primary,
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "55px",
              height: "55px",
              margin: "0 15px",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ‹
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            style={{
              background: theme.primary,
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "55px",
              height: "55px",
              margin: "0 15px",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>
        <style>
          {`
                    .cardd:hover {
                        transform: translateY(-5px);
                    }
                `}
        </style>
      </section>
    );
};

export default ParentsFeedbackSection;
