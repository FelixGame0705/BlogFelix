import { Col, Row, Card } from "antd";
import React from "react";

type GameProps = {
  title: string;
  description: string;
  image: string;
};

const games: GameProps[] = [
  {
    title: "Game 1",
    description: "Description for Game 1",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Game 2",
    description: "Description for Game 2",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Game 3",
    description: "Description for Game 3",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Game 4",
    description: "Description for Game 4",
    image: "https://via.placeholder.com/150",
  },
];

const StandardSection = () => {
  return (
    <>
      {/* Phần tiêu đề Games */}
      <Row
        className="game-title"
        style={{
          paddingLeft: "20%",
          paddingRight: "20%",
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        <Col span={24}>
          <h2 style={{ textAlign: "center" }}>Games</h2>
        </Col>
      </Row>

      {/* Phần nội dung Games */}
      <Row
        gutter={[16, 16]}
        style={{ paddingLeft: "20%", paddingRight: "20%",marginBottom: "10px" }}
      >
        {games.map((game, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              hoverable
              cover={<img alt={game.title} src={game.image} />}
            >
              <Card.Meta title={game.title} description={game.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default StandardSection;
