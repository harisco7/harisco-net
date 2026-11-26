import { useRouter } from 'next/router';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { withTranslation, i18n } from 'next-i18next';
import EnSVG from '../public/en.svg';
import DeSVG from '../public/de.svg';
import EsSVG from '../public/es.svg';
import BsSVG from '../public/bs.svg';
import LinkedinSVG from '../public/linkedin.svg';
import GithubSVG from '../public/github.svg';
import DevtoSVG from '../public/devto.svg';

const HeaderContent = (props) => {
  const router = useRouter();
  const language = i18n.language;

  return (
    <div className="content">
      <div className="header-languages">
        <button role="button" className={language === 'en' ? 'selected' : ''} href="/" onClick={() => router.push(router.asPath, undefined, { locale: 'en' })}>
          <Image src={EnSVG} className="header-language-icon" width={25} height={15} alt="English language icon" />
          <span className="header-language-icon">English</span>
        </button>
        <button role="button" className={language === 'de' ? 'selected' : ''} href="/de/" onClick={() => router.push(router.asPath, undefined, { locale: 'de' })}>
          <Image src={DeSVG} width={25} height={15} alt="German language icon" />
          <span className="header-language-icon">Deutsch</span>
        </button>
        <button role="button" className={language === 'es' ? 'selected' : ''} href="/es/" onClick={() => router.push(router.asPath, undefined, { locale: 'es' })}>
          <Image src={EsSVG} className="header-language-icon" width={25} height={15} alt="Spanish language icon" />
          <span className="header-language-icon">Español</span>
        </button>
        <button role="button" className={language === 'bs' ? 'selected' : ''} href="/bs/" onClick={() => router.push(router.asPath, undefined, { locale: 'bs' })}>
          <Image src={BsSVG} className="header-language-icon" width={25} height={15} alt="Bosnian language icon" />
          <span className="header-language-icon">Bosanski</span>
        </button>
      </div>
      <div className="header-center">
        <div className="header-center__background"></div>
        <div className="header-center__content">
          <h1>Haris Smajlagić</h1>
          <div className="diamond-placeholder">
            <div>
              <Image width={150} height={150} className="rounded" src="/profile.webp" alt="Haris" />
            </div>
            <div className="mt-20">
              <a href="https://www.linkedin.com/in/harisco/" className="diamond-left" target="_blank" rel="noopener noreferrer">
                <Image src={LinkedinSVG} className="header-links__icon" alt="LinkedIn" />
              </a>
              <a href="https://dev.to/harisco" className="diamond-bottom" target="_blank" rel="noopener noreferrer">
                <Image src={DevtoSVG} className="header-links__icon" alt="DEV.to" />
              </a>
              <a href="https://github.com/harisco7" className="diamond-right" target="_blank" rel="noopener noreferrer">
                <Image src={GithubSVG} className="header-links__icon" alt="GitHub" />
              </a>
            </div>
          </div>
          <h2>{props.t('h2')}</h2>
        </div>
      </div>
      <style jsx>{`
        .content {
          text-align: center;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          color: #fff;
          flex-direction: column;
          z-index: 2;
        }
        .header-language-icon {
          display: block;
        }
        .header-languages {
          position: absolute;
          top: 0;
          margin: 0 auto;
          overflow: hidden;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          display: inline-block;
        }
        .header-languages > button {
          background: rgba(57, 130, 178, 0.5);
          border: none;
          color: #eee;
          font-size: 0.7rem;
          padding: 7px 0 4px 0;
          cursor: pointer;
          min-width: 75px;
          display: inline-block;
          text-decoration: none;
          font-weight: 400;
        }
        .header-languages > button.selected,
        .header-languages > button:hover,
        .header-languages > button:focus {
          background: rgba(57, 130, 178, 0.9);
          color: #fff;
          outline: none;
        }
        .header-center {
          position: relative;
          width: calc(100% - 30px);
          max-width: 850px;
          box-shadow: 0px 0px 30px 45px rgba(0, 0, 0, 1);
        }
        .header-center__content {
          min-height: 350px;
          padding: 20px 20px 20px 20px;
          position: relative;
          z-index: 3;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 1) 70%);
        }
        .header-center__background {
          position: absolute;
          opacity: 1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('public/code.webp');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          z-index: 2;
        }
        h1 {
          font-weight: 500;
          margin: 0;
          font-size: 4.5vh;
          color: #fff;
        }
        h2 {
          margin-top: 10px;
          font-weight: 500;
          font-size: 1.2rem;
          color: #ddd;
          text-shadow: #dadada 1px 0 5px;
        }
        .header-image-container {
          overflow: hidden;
          display: block;
          width: 200px;
          border: none;
          outline: none;
          background-color: transparent;
          margin: 25px auto 0 auto;
        }
        .header-image {
          width: 100%;
        }
        .header-links {
          position: absolute;
          bottom: 0;
          margin: 0 auto;
          display: flex;
          overflow: hidden;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          min-width: 320px;
          border-bottom: 1px solid var(--mainBlue);
        }
        .header-links__icon {
          display: block;
          margin: 0 auto;
          height: 32px;
          width: auto;
          overflow: hidden;
        }
        @media screen and (max-width: 576px) {
          .header-links {
            min-width: 320px;
            width: 100%;
            border-radius: 0;
          }
          .header-links > a {
            padding: 13px 9px 13px 9px;
            background-color: #ddd;
          }
          .header-links > a > span {
            display: none;
          }
        }
        @media screen and (max-width: 850px) {
          .header-center {
            width: auto;
          }
          .header-center__content {
            min-height: 0;
            background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 1) 70%);
          }
        }
        .diamond-placeholder {
          overflow: visible;
          position: relative;
          padding: 20px 0;
          display: inline-block;
          margin: 0 auto;
        }
        .diamond-placeholder a {
          padding: 8px;
          background-color: rgba(255, 255, 255, 0.8);
          display: flex;
          place-items: center;
          margin: 0 10px;
        }
        .diamond-placeholder a:hover,
        .diamond-placeholder a:focus {
          filter: brightness(110%);
          background-color: #fff;
        }
      `}</style>
    </div>
  );
};

HeaderContent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(HeaderContent);
