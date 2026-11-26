import Typed from 'react-typed';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

const About = (props) => {
  const { t } = useTranslation('common');
  return (
    <div className="root" id={props.id}>
      <div className="about-container col-12 col-lg-auto">
        <div className="diagonal">
          <h2>{t('AboutMe')}</h2>
          {props.start ? (
            <div className="about-text">
              <Typed className="intro-text" typeSpeed={40} startDelay={1000} cursorChar={'_'} strings={['> ' + t('whoami')]}></Typed>
              <br />
              <br />
              <Typed typeSpeed={30} showCursor={false} strings={['^2000' + t('AboutMeText1') + '<br/><br/>' + t('AboutMeText2') + '<br/><br/>' + t('AboutMeText3') + '<br/><br/>' + t('AboutMeText4')]}></Typed>
            </div>
          ) : null}
        </div>
      </div>
      <style jsx>{`
        .root {
          min-height: 100vh;
          color: #200122;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          margin-top: 10px;
          margin-bottom: 10px;
          padding-top: 40px;
          padding-bottom: 40px;
        }
        .about-container {
          overflow: hidden;
          padding: 0;
          width: 100%;
        }
        @media screen and (min-width: 992px) {
          .about-container {
            width: 960px;
          }
        }
        .diagonal {
          color: #eee;
          min-width: 300px;
          min-height: calc(100vh - 150px);
          padding: 70px;
          position: relative;
          margin: 20px;
          background: var(--mainBlue);
        }
        @media screen and (max-width: 576px) {
          .diagonal {
            padding: 30px;
          }
        }
        .diagonal:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          border-top: 80px solid #fff;
          border-right: 80px solid transparent;
          width: 0;
        }
        h2 {
          font-weight: 400;
          font-size: 2.5rem;
          margin-top: 0;
          margin-bottom: 35px;
          line-height: 1;
        }
        @media screen and (max-width: 576px) {
          h2 {
            padding: 0 30px 0 40px;
            font-size: 2.2rem;
          }
          .diagonal {
            min-height: 100vh;
          }
        }
        .about-text {
          font-size: 1.2rem;
          line-height: 1.3;
          font-weight: 300;
        }
      `}</style>
    </div>
  );
};

About.propTypes = {
  id: PropTypes.string,
  t: PropTypes.func.isRequired,
  start: PropTypes.bool,
};

export default About;
