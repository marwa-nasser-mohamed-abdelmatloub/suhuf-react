import React from 'react';
import { Card } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import PrimaryButton from '../shared/PrimaryButton';
import AnimatedTitle from '../shared/AnimatedTitle';

const ProgramCard = ({ program }) => {
    const theme = useTheme();

    const handleJoinClick = () => {
        window.open('tel:201080290663');
    };

    return (
      <Card
        className="mb-4 shadow-sm program-card"
        style={{
          height: "100%",
          transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
          border: "none",
          borderRadius: "15px",
          overflow: "hidden",
          position: "relative",
          "--hover-color": theme.primary,
        }}
        data-aos="fade-up"
        data-aos-delay={(program.id % 3) * 100}
      >
        {program.image && (
          <Card.Img
            variant="top"
            src={program.image}
            alt={program.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <div className="program-card-overlay"></div>

        <Card.Body
          className="d-flex flex-column justify-content-center align-items-center text-center position-relative"
          style={{ zIndex: 2, padding: "20px" }}
        >
          <AnimatedTitle level={5} style={{ marginBottom: "10px" }}>
            {program.name}
          </AnimatedTitle>

          <Card.Text
            className="text-muted"
            style={{ fontSize: "1rem", marginBottom: "20px" }}
          >
            {program.description.length > 120
              ? `${program.description.substring(0, 120)}...`
              : program.description}
          </Card.Text>

          <PrimaryButton
            onClick={handleJoinClick}
            style={{
              width: "100%",
              maxWidth: "200px",
              backgroundColor: theme.success,
              transition: "all 0.3s ease",
            }}
            className="program-card-button"
          >
            سجل ابنك الآن
          </PrimaryButton>
        </Card.Body>
        <style>{`
                .program-card {
                    transition: transform 0.3s;
                }
                .program-card:hover {
                    transform: translateY(-10px) !important;
                }
            `}</style>
      </Card>
    );
};

export default ProgramCard;
