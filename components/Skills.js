/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Zoom from 'react-reveal/Zoom';
import { CircularProgressbar } from 'react-circular-progressbar';
import CountUp from 'react-countup';
import { withTranslation } from 'next-i18next';
import ProgressProvider from './ProgressProvider';
import React from 'react';
import Image from 'next/image';

class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
    };
    this.onComponentRevealed = this.onComponentRevealed.bind(this);
  }

  onComponentRevealed() {
    setTimeout(() => {
      this.setState({
        revealed: true,
      });
    }, 1500);
  }

  render() {
    const props = this.props;
    return (
      <div className="root" id={this.props.id}>
        <div className="container">
          <h2>{props.t('PersonalSkills')}</h2>
          <Zoom cascade onReveal={() => this.onComponentRevealed()}>
            <div className="row justify-content-center">
              <div className="col-12 col-lg-6">
                <div className="diagonal-left">
                  <h3>{props.t('TimeManagement')}</h3>
                  <Image src="/time.svg" alt={props.t('TimeManagement')} width={115} height={115} />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="diagonal-right">
                  <h3>{props.t('AttentionToDetails')}</h3>
                  <Image src="/details.svg" alt={props.t('AttentionToDetails')} width={115} height={115} />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="diagonal-bl">
                  <h3>{props.t('Resourcefulness')}</h3>
                  <Image src="/resources.svg" alt={props.t('Resourcefulness')} width={115} height={115} />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="diagonal-br">
                  <h3>{props.t('Responsibility')}</h3>
                  <Image src="/notepad.svg" alt={props.t('Responsibility')} width={115} height={115} />
                </div>
              </div>
              <div className="col-12">
                <div className="box">
                  <h3>{props.t('Languages')}</h3>
                  <div className="row">
                    <div className="col-12 col-lg-4 img">
                      <img src="/en.png" alt="Languages" className="special" />
                      <div className="img-label">{this.state.revealed ? <CountUp end={97} useEasing={true} suffix=" %" duration={4} /> : null}</div>
                      <div className="img-progress">
                        <ProgressProvider valueStart={0} valueEnd={this.state.revealed ? 97 : 0}>
                          {(value) => <CircularProgressbar value={value} />}
                        </ProgressProvider>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 img">
                      <img src="/de.png" alt="Languages" className="special" />
                      <div className="img-label">{this.state.revealed ? <CountUp end={90} useEasing={true} suffix=" %" duration={4} /> : null}</div>
                      <div className="img-progress">
                        <ProgressProvider valueStart={0} valueEnd={this.state.revealed ? 90 : 0}>
                          {(value) => <CircularProgressbar value={value} />}
                        </ProgressProvider>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 img">
                      <img src="/es.png" alt="Languages" className="special" />
                      <div className="img-label">{this.state.revealed ? <CountUp end={25} useEasing={true} suffix=" %" duration={4} /> : null}</div>
                      <div className="img-progress">
                        <ProgressProvider valueStart={0} valueEnd={this.state.revealed ? 25 : 0}>
                          {(value) => <CircularProgressbar value={value} />}
                        </ProgressProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </div>
        <style jsx global>{`
          .CircularProgressbar .CircularProgressbar-trail {
            stroke: #fff;
          }
          .CircularProgressbar .CircularProgressbar-path {
            stroke: #23a0fc;
            stroke-linecap: square;
            transition: stroke-dashoffset 3s ease 0s;
          }
          .special {
            border-radius: 64px;
            width: auto;
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            top: 50%;
            transform: translateY(-50%);
            height: 135px;
          }
        `}</style>
        <style jsx>{`
          .root {
            min-height: 100vh;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--mainBlueSecondary);
            padding: 60px 0 100px 0;
          }
          .container {
            text-align: center;
          }
          h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 60px;
          }
          h3 {
            color: #fff;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 400;
            margin-bottom: 15px;
          }
          .box {
            color: #ddd;
            padding: 40px;
            position: relative;
            background: crimson;
            max-width: calc(100% - 160px);
            margin-left: auto;
            margin-right: auto;
            padding-bottom: 50px;
          }
          .box > h3 {
            margin-bottom: 30px;
          }
          .diagonal-left,
          .diagonal-right,
          .diagonal-bl,
          .diagonal-br {
            color: #ddd;
            padding: 40px;
            position: relative;
            margin-bottom: 30px;
            background: crimson;
          }
          @media screen and (max-width: 991px) {
            .diagonal-left,
            .diagonal-right,
            .diagonal-bl,
            .diagonal-br {
              margin-bottom: 50px;
            }
            .diagonal-left:before,
            .diagonal-right:before,
            .diagonal-bl:before,
            .diagonal-br:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              border-top: 80px solid var(--mainBlueSecondary);
              border-right: 80px solid transparent;
              border-bottom: 0;
              border-left: 0;
            }
            .diagonal-left:after,
            .diagonal-right:after,
            .diagonal-bl:after,
            .diagonal-br:after {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              border-top: 80px solid var(--mainBlueSecondary);
              border-left: 80px solid transparent;
              width: 0;
            }
          }
          @media screen and (min-width: 992px) {
            .diagonal-left:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              border-top: 80px solid var(--mainBlueSecondary);
              border-right: 80px solid transparent;
              width: 0;
            }
            .diagonal-right:before {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              border-top: 80px solid var(--mainBlueSecondary);
              border-left: 80px solid transparent;
              width: 0;
            }
            .diagonal-bl:before {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              border-bottom: 80px solid var(--mainBlueSecondary);
              border-right: 80px solid transparent;
              width: 0;
            }
            .diagonal-br:before {
              content: '';
              position: absolute;
              bottom: 0;
              right: 0;
              border-bottom: 80px solid var(--mainBlueSecondary);
              border-left: 80px solid transparent;
              width: 0;
            }
            .container {
              max-width: 980px;
            }
          }
          .img {
            position: relative;
            height: 150px;
            margin: 15px auto 50px auto;
            max-width: 150px;
          }
          @media screen and (max-width: 992px) {
            .box {
              max-width: none;
            }
          }
          .img-progress {
            position: absolute;
            left: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            bottom: 0;
          }
          .img-label {
            text-align: center;
            position: absolute;
            bottom: -45px;
            margin: 0 auto;
            left: 0;
            right: 0;
            width: 100%;
            padding-left: 15px;
            font-size: 1.5rem;
            font-weight: 400;
            color: #fff;
          }
        `}</style>
      </div>
    );
  }
}

Skills.propTypes = {
  id: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Skills);
