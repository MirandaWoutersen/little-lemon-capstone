import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import Button from "../Button/Button";
import Image from "../../assets/chef.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const onClickReserve = () => {
    navigate("/reservations");
  }

  return (
    <div className="hero-background">
      <div className="hero">
        <div className="hero-info">
          <h1 className="title">Little Lemon</h1>
          <h2 className="subtitle">Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          <Button title={"Reserve a table"} onClick={onClickReserve} />
        </div>

        <img
          className="image"
          src={Image}
          alt="Chef"
          height={200}
          width={200}
        />
      </div>
    </div>
  );
};

export default Hero;
