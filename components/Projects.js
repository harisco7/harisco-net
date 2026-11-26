import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';

const Projects = (props) => (
  <div className="root" id={props.id}>
    <h2 className="h2">{props.t('Projects')}</h2>
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4 project">
          <h4>
            <a href="https://edyoucated.org/" target="blank" className="ext-link">
              Edyoucated
            </a>
          </h4>
          <ul>
            <li>{props.t('WikiForumPlatform1')}</li>
            <li>{props.t('WikiForumPlatform2')}</li>
            <li>{props.t('WikiForumPlatform3')}</li>
            <li>{props.t('WikiForumPlatform4')}</li>
          </ul>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              {props.t('StatusLabel')}: <span className="label blue">{props.t('DoneLabel')}</span>
              &nbsp;&nbsp;
              {props.t('DurationLabel')}: <span className="label duration">7 {props.t('MonthsLabel')}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 project">
          <h4>
            <a href="https://www.textunited.com/" target="blank" className="ext-link">
              {props.t('TextUnited')}
            </a>
          </h4>
          <ul>
            <li>{props.t('TextUnited1')}</li>
            <li>{props.t('TextUnited2')}</li>
            <li>{props.t('TextUnited3')}</li>
            <li>{props.t('TextUnited4')}</li>
          </ul>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              {props.t('StatusLabel')}: <span className="label blue">{props.t('DoneLabel')}</span>
              &nbsp;&nbsp;
              {props.t('DurationLabel')}: <span className="label duration">5+ years</span>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 project">
          <h4>
            <a href="https://protonet.com/" target="blank" className="ext-link">
              Protonet SOUL
            </a>
          </h4>
          <ul>
            <li>{props.t('Protonet1')}</li>
            <li>{props.t('Protonet2')}</li>
            <li>{props.t('Protonet3')}</li>
            <li>{props.t('Protonet4')}</li>
          </ul>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              {props.t('StatusLabel')}: <span className="label blue">{props.t('DoneLabel')}</span>
              &nbsp;&nbsp;
              {props.t('DurationLabel')}: <span className="label duration">16 {props.t('MonthsLabel')}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 project">
          <h4>{props.t('eTermin')}</h4>
          <ul>
            <li>{props.t('eTermin1')}</li>
            <li>{props.t('eTermin2')}</li>
            <li>{props.t('eTermin3')}</li>
            <li>{props.t('eTermin4')}</li>
          </ul>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              {props.t('StatusLabel')}: <span className="label gray">{props.t('ArchivedLabel')}</span>
              &nbsp;&nbsp;
              {props.t('DurationLabel')}: <span className="label duration">9 {props.t('MonthsLabel')}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 project">
          <h4>{props.t('ElectionVoting')}</h4>
          <ul>
            <li>{props.t('ElectionVoting1')}</li>
            <li>{props.t('ElectionVoting2')}</li>
            <li>{props.t('ElectionVoting3')}</li>
            <li>{props.t('ElectionVoting4')}</li>
          </ul>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              {props.t('StatusLabel')}: <span className="label blue">{props.t('DoneLabel')}</span>
              &nbsp;&nbsp;
              {props.t('DurationLabel')}: <span className="label duration">3 {props.t('MonthsLabel')}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 project">
          <h4>{props.t('Shopify')}</h4>
          <ul>
            <li>{props.t('Shopify1')}</li>
            <li>{props.t('Shopify2')}</li>
            <li>{props.t('Shopify3')}</li>
            <li>{props.t('Shopify4')}</li>
          </ul>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              {props.t('StatusLabel')}: <span className="label blue">{props.t('DoneLabel')}</span>
              &nbsp;&nbsp;
              {props.t('DurationLabel')}: <span className="label duration">6 {props.t('MonthsLabel')}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 project">
          <h4>{props.t('ShortenText')}</h4>
          <ul>
            <li>{props.t('ShortenText1')}</li>
            <li>{props.t('ShortenText2')}</li>
            <li>{props.t('ShortenText3')}</li>
            <li>{props.t('ShortenText4')}</li>
          </ul>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              {props.t('StatusLabel')}: <span className="label blue">{props.t('DoneLabel')}</span>
              &nbsp;&nbsp;
              {props.t('DurationLabel')}: <span className="label duration">12 {props.t('MonthsLabel')}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 project">
          <h4>{props.t('DigitalLibrary')}</h4>
          <ul>
            <li>{props.t('DigitalLibrary1')}</li>
            <li>{props.t('DigitalLibrary2')}</li>
            <li>{props.t('DigitalLibrary3')}</li>
            <li>{props.t('DigitalLibrary4')}</li>
          </ul>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              {props.t('StatusLabel')}: <span className="label gray">{props.t('ArchivedLabel')}</span>
              &nbsp;&nbsp;
              {props.t('DurationLabel')}: <span className="label duration">6 {props.t('MonthsLabel')}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 project">
          <h4>{props.t('ErpSystem')}</h4>
          <ul>
            <li>{props.t('ErpSystem1')}</li>
            <li>{props.t('ErpSystem2')}</li>
            <li>{props.t('ErpSystem3')}</li>
            <li>{props.t('ErpSystem4')}</li>
          </ul>
          <div className="row justify-content-center">
            <div className="col-xs-auto">
              {props.t('StatusLabel')}: <span className="label gray">{props.t('ArchivedLabel')}</span>
              &nbsp;&nbsp;
              {props.t('DurationLabel')}: <span className="label duration">12 {props.t('MonthsLabel')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .root {
        min-height: 100vh;
        color: #200122;
        background-color: #fff;
        padding-bottom: 100px;
        padding-top: 55px;
        overflow: hidden;
      }
      .h2 {
        font-size: 2.5rem;
        font-weight: 700;
        text-align: center;
        width: 100%;
        margin: 0 0 55px 0;
      }
      h4 {
        font-weight: 400;
        text-align: center;
        font-size: 1.4rem;
        margin: 50px 0 20px 0;
      }
      h4 .ext-link {
        color: #1e90ff;
      }
      .project {
        font-weight: 300;
        font-size: 1rem;
        text-align: center;
        padding-bottom: 55px;
        transition: color 0.25s;
        border: 1px solid #ddd;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        z-index: 2;
      }
      .project::before {
        box-sizing: inherit;
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        z-index: -1;
        top: 0;
        left: 0;
      }
      .project:hover {
        transform: scale(1.05);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        background-color: #fff;
        z-index: 3;
      }
      .project:hover::before {
        width: 100%;
        height: 100%;
      }
      .project:hover::before {
        transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
      }
      ul {
        list-style: none;
        margin: 0 auto 5px auto;
        display: inline-block;
        padding: 0;
        text-align: left;
      }
      ul li {
        margin: 0;
        margin-bottom: 1em;
        padding-left: 1.5em;
        position: relative;
      }
      ul li:after {
        content: '';
        height: 0.4em;
        width: 0.4em;
        background: #d2153a;
        display: block;
        position: absolute;
        transform: rotate(45deg);
        top: 0.55em;
        left: 0;
      }
      .label {
        font-size: 0.8rem;
        line-height: 1.6rem;
        padding: 3px 10px;
        vertical-align: middle;
      }
      .green {
        background-color: rgb(6, 170, 0);
        color: #fff;
      }
      .duration {
        background-color: crimson;
        color: #fff;
      }
      .yellow {
        background-color: #999900;
        color: #fff;
      }
      .orange {
        background-color: #ff4500;
        color: #fff;
      }
      .blue {
        background-color: #1e90ff;
        color: #fff;
      }
      .gray {
        background-color: #696969;
        color: #fff;
      }
    `}</style>
  </div>
);

Projects.propTypes = {
  id: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Projects);
