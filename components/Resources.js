import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';

const Resources = (props) => (
  <div className="root" id={props.id}>
    <div className="container">
      <h2>{props.t('Resources')}</h2>
      <h3>{props.t('ResourcesDesc')}</h3>
      <div className="row">
        <div className="col-12 project">
          <h4>{props.t('EmailNewsletters')}</h4>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              <a href="https://frontendfoc.us/" target="_blank" rel="noopener noreferrer">
                Front-end Focus
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://www.tldrnewsletter.com/" target="_blank" rel="noopener noreferrer">
                TLDR
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://mobiledevweekly.com/" target="_blank" rel="noopener noreferrer">
                Mobile Dev Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://webtoolsweekly.com/" target="_blank" rel="noopener noreferrer">
                Web Tools Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://nodeweekly.com/" target="_blank" rel="noopener noreferrer">
                Node Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="http://reactjsnewsletter.com/" target="_blank" rel="noopener noreferrer">
                React Newsletter
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://responsivedesign.is/" target="_blank" rel="noopener noreferrer">
                Responsive Design Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://wdrl.info/" target="_blank" rel="noopener noreferrer">
                Web Development Reading List
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://javascriptweekly.com/" target="_blank" rel="noopener noreferrer">
                Javascript Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="http://uxdesignweekly.com/" target="_blank" rel="noopener noreferrer">
                UX Design Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://www.smashingmagazine.com" target="_blank" rel="noopener noreferrer">
                Smashing Newsletter
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="http://aiweekly.co/" target="_blank" rel="noopener noreferrer">
                AI Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://css-weekly.com/" target="_blank" rel="noopener noreferrer">
                CSS Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://www.sitepoint.com/newsletter/" target="_blank" rel="noopener noreferrer">
                Sitepoint Newsletter
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://postgresweekly.com/" target="_blank" rel="noopener noreferrer">
                Postgres Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://goodbits.io/emails/635efb73-5078-4937-ad39-eeda04e3286d" target="_blank" rel="noopener noreferrer">
                Postanly Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://www.graphqlweekly.com/" target="_blank" rel="noopener noreferrer">
                GraphQL Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://www.deeplearningweekly.com/" target="_blank" rel="noopener noreferrer">
                Deep Learning Weekly
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://www.medium.com/" target="_blank" rel="noopener noreferrer">
                Medium Weekly Digest
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://www.dev.to/" target="_blank" rel="noopener noreferrer">
                DEV Digest
              </a>
            </div>
            <div className="col-xs-auto">
              <a href="https://programmingdigest.net/" target="_blank" rel="noopener noreferrer">
                Programming Digest
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 project">
          <h4>Awesome Lists</h4>
          <div className="subtitle">{props.t('AwesomeDesc1')}</div>
          <div className="col-xs-auto">
            <a href="https://github.com/sindresorhus/awesome" target="_blank" rel="noopener noreferrer">
              sindresorhus/awesome
            </a>
          </div>
        </div>
        <div className="col-12 col-md-4 project">
          <h4>Awesome Awesomeness</h4>
          <div className="subtitle">{props.t('AwesomeDesc2')}</div>
          <div className="col-xs-auto">
            <a href="https://github.com/bayandin/awesome-awesomeness" target="_blank" rel="noopener noreferrer">
              bayandin/awesome-awesomeness
            </a>
          </div>
        </div>
        <div className="col-12 col-md-4 project">
          <h4>{props.t('Codepen')}</h4>
          <div className="subtitle">{props.t('CodepenDesc')}</div>
          <div className="col-xs-auto">
            <a href="https://codepen.io/collection/DwJYwz/" target="_blank" rel="noopener noreferrer">
              CodePen Coolness
            </a>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .root {
        min-height: 100vh;
        color: #200122;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #efefef;
        padding: 40px 0 60px 0;
      }
      .container {
        text-align: center;
      }
      h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 20px;
      }
      h3 {
        font-weight: 400;
        margin-bottom: 40px;
        font-size: 1.3rem;
      }
      h4 {
        margin: 15px 0;
        font-size: 1.1rem;
      }
      .subtitle {
        font-size: 1rem;
        max-width: 66%;
        margin: 0 auto;
      }
      .project {
        font-weight: 300;
        font-size: 1rem;
        text-align: center;
        padding-bottom: 20px;
        padding-top: 10px;
        transition: color 0.25s;
        border: 1px solid #ddd;
      }
      a {
        background: #ddd;
        border-radius: 3px 0 0 3px;
        color: #200122;
        display: inline-block;
        height: 30px;
        line-height: 29px;
        padding: 0 15px 0 25px;
        position: relative;
        margin: 15px;
        font-size: 16px;
      }
      a::before {
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
      a::after {
        background: transparent;
        border-bottom: 15px solid transparent;
        border-left: 10px solid #ddd;
        border-top: 15px solid transparent;
        content: '';
        position: absolute;
        right: -10px;
        top: 0;
      }
      a:hover {
        text-decoration: none;
      }
      a:hover::after {
        border-left-color: #aaa;
      }
      a:hover::before {
        background: #aaa;
      }
    `}</style>
  </div>
);

Resources.propTypes = {
  id: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Resources);
