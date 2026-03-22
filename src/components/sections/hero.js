import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  // const one = <h1>Namaste! My name is</h1>;
  // const two = <h2 className="big-heading">Chandrika Deb</h2>;
  // const three = <h3 className="medium-heading">MBA | Digital Marketing | Freelance Blogger</h3>;
  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Mimansha</h2>;
  const three = (
    <h3 className="medium-heading">I build AI-powered applications and full-stack systems.</h3>
  );
  const four = (
    <>
      <p>
        I am a Computer Science student with a strong focus on AI, full-stack development, and
        problem-solving using data structures and algorithms.
      </p>

      <p>
        I have built projects like <strong>CareerVerse</strong>, an AI-powered job portal that
        performs resume analysis, detects skill gaps, and provides personalized career
        recommendations using NLP and machine learning.
      </p>

      <p>
        I enjoy building scalable systems, solving real-world problems, and continuously improving
        my skills in software development and AI-driven solutions.
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="mailto:mimanshashahi@gmail.com">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
