import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';

const Footer = (props) => (
  <footer className="root" id={props.id}>
    <div className="footer__bg"></div>
    <div className="container">
      <span>{props.t('BuiltWith')}</span>{' '}
      <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
        Next JS
      </a>
      <br />
      <span>{props.t('AnimatedWith')}</span>{' '}
      <a href="https://www.react-reveal.com/" target="_blank" rel="noopener noreferrer">
        React Reveal
      </a>
      <br />
      <span>{props.t('HostedBy')}</span>{' '}
      <a href="https://www.heroku.com/" target="_blank" rel="noopener noreferrer">
        Heroku
      </a>
      <br />
      <br />
      <span>
        {props.t('CopyrightBy')} Haris Smajlagić. &copy; {new Date().getFullYear()}
      </span>
    </div>
    <style jsx>{`
      .root {
        min-height: 150px;
        color: rgb(221, 221, 221);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #efefef;
        padding: 120px 0 50px 0;
        position: relative;
        overflow: hidden;
      }
      @media screen and (max-width: 576px) {
        .root {
          padding-top: 70px;
        }
      }
      .footer__bg {
        position: absolute;
        z-index: 2;
        align-self: stretch;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 200%;
        background-color: var(--mainBlueSecondary);
        transform: skewY(3deg);
        transform-origin: top left;
      }
      .container {
        text-align: center;
        font-weight: 300;
        font-size: 15px;
        position: relative;
        z-index: 3;
      }
    `}</style>
  </footer>
);

Footer.propTypes = {
  id: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Footer);
