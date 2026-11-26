import PropTypes from 'prop-types';
import HeaderContent from '../components/HeaderContent.js';
import { withTranslation } from 'next-i18next';

const Header = (props) => (
  <header className="root" id={props.id}>
    <div className="start">
      <HeaderContent />
      <canvas className="background" id="background"></canvas>
    </div>
    <style jsx>{`
      .root {
        background-color: #000;
        min-height: 100vh;
      }
      .background {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    `}</style>
  </header>
);

Header.propTypes = {
  id: PropTypes.string,
};

export default withTranslation('common')(Header);
