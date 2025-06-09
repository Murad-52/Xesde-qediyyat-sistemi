import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './MedicalExpertsSection.css';
import docNigar from '../../../assets/images/homepage/medicalExpertsSecton/5a52c8ad45104697203ae9a5ce72c4f7216f8098.jpg'
import docKamal from '../../../assets/images/homepage/medicalExpertsSecton/c9f779434fe0b7ec0ed37f3828ae44a59b3f10a5.jpg'
import docAysu from '../../../assets/images/homepage/medicalExpertsSecton/9a2d2477d4e6d99afd0bfdfaa87b7db6bb9be2db.jpg'
import docRauf from '../../../assets/images/homepage/medicalExpertsSecton/ca59def1670ffe9538f5aae1923943ecf699f52d.jpg'
const doctors = [
  { name: 'Dr. Nigar Farac', title: 'Psychologist', img: docNigar },

  { name: 'Dr. Kamal Qurbanov', title: 'Cardiologist', img: docKamal },

  { name: 'Dr. Aysu Islamova', title: 'Dentist', img: docAysu },

  { name: 'Dr. Emil Hüseynov', title: 'Dermatologist', img: docKamal },

  { name: 'Dr. Elvin Abbasov', title: 'Pediatrician', img: docRauf },

  { name: 'Dr. Nigar Farac', title: 'Oncologist', img: docNigar },

  { name: 'Dr. Aysu Islamova', title: 'Orthopedist', img: docAysu },

  { name: 'Dr. Şəbnəm Rüstəmli', title: 'ENT Specialist', img: docNigar },

  { name: 'Dr. Emil Hüseynov', title: 'Radiologist', img: docKamal},
];

const MedicalExpertsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleDoctors = doctors.slice(activeIndex * 3, activeIndex * 3 + 3);

  return (
    <section className="experts-section py-5">
      <Container>
        <h2 className="experts-heading text-center mb-2 ">Our Medical Experts</h2>
        <p className="experts-description text-center text-dark mb-5">
          Trusted specialists providing top-quality medical care for you and your family.
        </p>
        <Row className="justify-content-center">
          {visibleDoctors.map((doc, index) => (
            <Col key={index} md="4" className="text-center mb-4">
              <div className="expert-card p-3 rounded shadow-sm">
                <img src={doc.img} alt={doc.name} className="img-fluid rounded" />
                <h5>{doc.name}</h5>
                <p >{doc.title}</p>
              </div>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center mt-3">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              className={`dot mx-2 ${activeIndex === i ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default MedicalExpertsSection;
