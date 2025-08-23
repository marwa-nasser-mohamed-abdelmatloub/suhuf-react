import React from "react";
import { Container, Card } from "react-bootstrap";
import AnimatedTitle from "./AnimatedTitle";
import { useTheme } from "./ThemeProvider";

const IslamicStudiesSection = () => {
  const theme = useTheme();

  const cards = [
    {
      icon: "bi-moon-stars",
      title: "العقيدة",
      text: "أساسيات العقيدة الإسلامية بأسلوب مبسط وسهل.",
    },
    {
      icon: "bi-journal-bookmark",
      title: "السيرة النبوية",
      text: "قصص ومواقف من حياة النبي صلى الله عليه وسلم.",
    },
    {
      icon: "bi-book-half",
      title: "الفقه اليومي",
      text: "أحكام مبسطة لتطبيقها في حياتنا اليومية.",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: theme.secondary,
        padding: "60px 0",
        direction: "rtl",
        textAlign: "center",
      }}
    >
      <Container>
        <AnimatedTitle level={2} style={{ marginBottom: "20px" }}>
          قسم الإسلاميات
        </AnimatedTitle>
        <p
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: theme.muted,
          }}
        >
          نقدم للطلاب دروسًا تربوية مبسطة تناسب أعمارهم، تشمل العقيدة، السيرة
          النبوية، الفقه اليومي، والأخلاق الإسلامية، بأسلوب سهل وممتع يساعدهم
          على فهم دينهم والعمل به.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              style={{
                width: "280px",
                borderRadius: "15px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                border: "none",
                backgroundColor: theme.light,
                transition: "transform 0.3s ease",
              }}
              className="custom-card"
            >
              <Card.Body style={{ textAlign: "center" }}>
                <i
                  className={`bi ${card.icon}`}
                  style={{ fontSize: "3rem", color: theme.primary }}
                ></i>
                <Card.Title style={{ marginTop: "15px", color: theme.primary }}>
                  {card.title}
                </Card.Title>
                <Card.Text style={{ color: theme.muted }}>
                  {card.text}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
      <style>{`
        .custom-card:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  );
};

export default IslamicStudiesSection;
