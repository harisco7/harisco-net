import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'next-i18next';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      sending: false,
      done: false,
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }

  handleKeyDown(e) {
    // Reset field height
    e.target.style.height = 'inherit';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10) + parseInt(computed.getPropertyValue('padding-top'), 10) + e.target.scrollHeight + parseInt(computed.getPropertyValue('padding-bottom'), 10) + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    e.target.style.height = `${Math.max(height + 15, 100)}px`;
  }

  sendMessage() {
    this.setState({
      sending: true,
    });
    axios
      .post('/api/contact', this.state)
      .then((result) => {
        console.log(result);
        setTimeout(() => {
          this.setState({
            name: '',
            email: '',
            message: '',
            done: true,
          });
        }, 1000);
      })
      .catch(() => {
        this.setState({
          sending: false,
        });
      });
  }

  render() {
    const email = 'info@harisco.net';
    const props = this.props;
    return (
      <div className="root" id={props.id}>
        <div className="container">
          <h3>{props.t('ContactTitle')}</h3>
          <h2>{props.t('ContactSubTitle')}</h2>
          <div className="desc">{props.t('ContactMessage', { email })}</div>
          <div className="form">
            <input type="text" name="name" placeholder={props.t('ContactName')} aria-label={props.t('ContactName')} value={this.state.name} onChange={this.handleInputChange}></input>
            <input type="email" name="email" placeholder={props.t('ContactEmail')} aria-label={props.t('ContactEmail')} value={this.state.email} onChange={this.handleInputChange}></input>
            <textarea placeholder={props.t('ContactYourMessage')} aria-label={props.t('ContactYourMessage')} name="message" value={this.state.message} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown}></textarea>
            <div className="foot">
              {this.state.sending && !this.state.done ? (
                <div className="sk-folding-cube">
                  <div className="sk-cube1 sk-cube"></div>
                  <div className="sk-cube2 sk-cube"></div>
                  <div className="sk-cube4 sk-cube"></div>
                  <div className="sk-cube3 sk-cube"></div>
                </div>
              ) : null}
              {!this.state.sending && !this.state.done ? <button onClick={this.sendMessage}>{props.t('ContactSend')}</button> : null}
              {this.state.done ? <div className="success">{props.t('ContactSendSuccess')}</div> : <span></span>}
            </div>
          </div>
        </div>
        <style jsx>{`
          .root {
            background-color: #fff;
            padding: 5.5rem 0;
            margin: 5rem 0;
          }
          .form {
            text-align: center;
          }
          h2 {
            font-size: 2rem;
            font-weight: 700;
            margin: 0 0 1em 0;
            text-align: center;
            line-height: 1;
            color: rgb(49, 0, 0);
          }
          h3 {
            text-align: center;
            color: #aaa;
            margin-bottom: 15px;
          }
          .desc {
            text-align: center;
            margin-bottom: 2rem;
          }
          .success {
            font-weight: 700;
          }
          input,
          textarea {
            margin: 0 auto;
            display: block;
            width: 100%;
            max-width: 768px;
            line-height: 50px;
            height: 50px;
            outline: none;
            border: none;
            border-bottom: 1px solid #ddd;
            padding: 0 15px;
            text-align: left;
            margin-bottom: 30px;
            font-size: 1.1rem;
            overflow: hidden;
            resize: none;
          }
          textarea {
            margin-top: 40px;
            height: 100px;
            line-height: 1.2;
          }
          input:focus,
          textarea:focus {
            border-bottom: 1px solid rgb(49, 0, 0);
          }
          button {
            background-color: var(--mainBlueSecondary);
            color: #fff;
            display: block;
            width: 100%;
            max-width: 180px;
            padding: 0 15px;
            outline: none;
            border: none;
            line-height: 50px;
            margin: 0 auto;
            cursor: pointer;
            border-radius: 4px;
          }
          button:hover,
          button:focus {
            filter: brightness(160%);
          }
          .foot {
            min-height: 55px;
          }
          .sk-folding-cube {
            margin: 0 auto;
            width: 40px;
            height: 40px;
            position: relative;
            transform: rotateZ(45deg);
          }
          .sk-folding-cube .sk-cube {
            float: left;
            width: 50%;
            height: 50%;
            position: relative;
            transform: scale(1.1);
          }
          .sk-folding-cube .sk-cube:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--mainBlueSecondary);
            animation: sk-foldCubeAngle 2.4s infinite linear both;
            transform-origin: 100% 100%;
          }
          .sk-folding-cube .sk-cube2 {
            transform: scale(1.1) rotateZ(90deg);
          }
          .sk-folding-cube .sk-cube3 {
            transform: scale(1.1) rotateZ(180deg);
          }
          .sk-folding-cube .sk-cube4 {
            transform: scale(1.1) rotateZ(270deg);
          }
          .sk-folding-cube .sk-cube2:before {
            animation-delay: 0.3s;
          }
          .sk-folding-cube .sk-cube3:before {
            animation-delay: 0.6s;
          }
          .sk-folding-cube .sk-cube4:before {
            animation-delay: 0.9s;
          }
          @-webkit-keyframes sk-foldCubeAngle {
            0%,
            10% {
              transform: perspective(140px) rotateX(-180deg);
              opacity: 0;
            }
            25%,
            75% {
              transform: perspective(140px) rotateX(0deg);
              opacity: 1;
            }
            90%,
            100% {
              transform: perspective(140px) rotateY(180deg);
              opacity: 0;
            }
          }

          @keyframes sk-foldCubeAngle {
            0%,
            10% {
              transform: perspective(140px) rotateX(-180deg);
              opacity: 0;
            }
            25%,
            75% {
              transform: perspective(140px) rotateX(0deg);
              opacity: 1;
            }
            90%,
            100% {
              transform: perspective(140px) rotateY(180deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }
}

Contact.propTypes = {
  id: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Contact);
