import React from "react";

export const Steps = () => {
  return (
    <section className="steps section container">
      <div className="steps__bg">
        <h2 className="section__title-center steps__title">
          Steps to start your <br /> plants off right
        </h2>

        <div className="steps__container grid">
          <div className="steps__card">
            <div className="steps__card-number">01</div>
            <h3 className="steps__card-title">Choose Plant</h3>
            <p className="steps__card-description">
              We have several varieties plants you can choose from.
            </p>
          </div>

          <div className="steps__card">
            <div className="steps__card-number">02</div>
            <h3 className="steps__card-title">Place an order</h3>
            <p className="steps__card-description">
              Once your order is set, we move to the next step which is the
              shipping.
            </p>
          </div>

          <div className="steps__card">
            <div className="steps__card-number">03</div>
            <h3 className="steps__card-title">Get plants delivered</h3>
            <p className="steps__card-description">
              Our delivery process is easy, you receive the plant direct to your
              door.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
