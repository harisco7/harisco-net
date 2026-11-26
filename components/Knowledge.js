import Zoom from 'react-reveal/Zoom';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';

const Knowledge = (props) => (
  <div className="root" id={props.id}>
    <div className="container">
      <h2>{props.t('Knowledge')}</h2>
      <Zoom cascade>
        <div>
          {props.labels.map((label, index) => (
            <span key={index} className="tag">
              {label}
            </span>
          ))}
        </div>
      </Zoom>
    </div>
    <style jsx>{`
      .root {
        min-height: 100vh;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--mainBlueSecondary);
        padding: 40px 0 70px 0;
      }
      .container {
        text-align: center;
      }
      h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 30px;
      }
      .tag {
        background: crimson;
        border-radius: 3px 0 0 3px;
        color: #fff;
        display: inline-block;
        height: 29px;
        line-height: 27px;
        padding: 0 15px 0 27px;
        position: relative;
        margin: 20px;
        text-decoration: none;
        font-size: 0.9rem;
      }
      .tag::before {
        background: #fff;
        border-radius: 10px;
        box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
        content: '';
        height: 6px;
        left: 10px;
        position: absolute;
        width: 6px;
        top: 11px;
      }

      .tag::after {
        background: transparent;
        border-bottom: 15px solid transparent;
        border-left: 10px solid crimson;
        border-top: 14px solid transparent;
        content: '';
        position: absolute;
        right: -10px;
        top: 0;
      }
    `}</style>
  </div>
);

Knowledge.propTypes = {
  id: PropTypes.string,
  t: PropTypes.func.isRequired,
  labels: PropTypes.array,
};

export default withTranslation('common')(Knowledge);
