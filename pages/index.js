/* eslint-disable @next/next/no-page-custom-font */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Header from '../components/Header.js';
import About from '../components/About.js';
import Knowledge from '../components/Knowledge.js';
import Projects from '../components/Projects.js';
import Skills from '../components/Skills.js';
import Resources from '../components/Resources.js';
import Contact from '../components/Contact.js';
import Footer from '../components/Footer.js';
import Scrollspy from 'react-scrollspy';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Head from 'next/head';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const isProd = process.env.NODE_ENV === 'production';
const GA_TRACKING_ID = 'UA-126543573-1';
const root = 'https://www.harisco.net';

if (typeof window !== 'undefined') {
  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 23);
      }
    );
  })();
}

var Point = function () {
  this._size = 0.5;
  this._x = 0;
  this._y = 0;
  this._direction = 0;
  this._velocity = 0;
  this._distances = [];
  this._neighboors = [];
  this._randomization = 0;

  this.__collection = null;

  this._step = function (aCollection) {
    var modifiedVelocity = this._velocity * 1 * ((Math.random() * this._randomization + 1) / 10);
    var direction = (Math.random() * 2) % 2 > 1 ? -1 : 1;

    this._direction = this._direction * 1 + Math.random() * this._randomization * direction;
    var radianAngle = (this._direction * Math.PI) / 180;

    this._x = this._x * 1 + modifiedVelocity * Math.cos(radianAngle) * 1;
    this._y = this._y * 1 + modifiedVelocity * Math.sin(radianAngle) * 1;

    if (this._x > width) this._x = 0;
    if (this._x < 0) this._x = width;
    if (this._y > height) this._y = 0;
    if (this._y < 0) this._y = height;

    this.__collection = aCollection;
  };

  this._computeNeighboors = function () {
    if (this.__collection == null) return;

    var aCollection = this.__collection;
    //compute the closest neighboor
    this._distances = [];
    for (let i = 0; i < aCollection.length; i++) {
      if (aCollection[i]._x != this._x && aCollection[i]._y != this._y) {
        this._distances.push({
          pointIndex: i,
          pointObj: aCollection[i],
          distance: Math.sqrt(Math.pow(this._x - aCollection[i]._x, 2) + Math.pow(this._y - aCollection[i]._y, 2)),
        });
      }
    }
    this._distances.sort(function (a, b) {
      let defaultReturn = 0;
      if (a.distance < b.distance) defaultReturn = -1;
      if (a.distance > b.distance) defaultReturn = 1;
      return defaultReturn;
    });

    this._neighboors = this._distances.slice(0, 3);
  };

  this.draw = function (context) {
    this._computeNeighboors();

    //draw connection lines

    context.lineWidth = 0.25;
    context.strokeStyle = '#888';

    context.beginPath();
    for (let i = 0; i < this._neighboors.length; i++) {
      context.moveTo(this._x, this._y);
      context.lineTo(this._neighboors[i].pointObj._x, this._neighboors[i].pointObj._y);

      context.lineWidth = 0.1 + 5 / this._neighboors[i].distance;
    }
    context.closePath();

    context.stroke();

    context.beginPath();
    context.arc(this._x, this._y, this._size * this._velocity, 0, 2 * Math.PI, false);
    context.fillStyle = '#444';
    context.strokeStyle = '#444';
    context.lineWidth = 0.5;
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(this._x, this._y, this._size, 0, 2 * Math.PI, false);
    context.fillStyle = '#444';
    context.fill();
  };
};

var aPoints = [];
var can, ctx, width, height;
var numPoints = 50;

function init() {
  can = document.getElementById('background');
  width = can.offsetWidth;
  height = can.offsetHeight;
  can.setAttribute('width', width);
  can.setAttribute('height', height);
  ctx = can.getContext('2d');

  for (let x = 0; x < numPoints; x++) {
    var newPoint = new Point();
    newPoint._size = (Math.random() * (3 - 0.5) + 0.5).toFixed(2);
    newPoint._x = (Math.random() * width).toFixed(0);
    newPoint._y = (Math.random() * height).toFixed(0);
    newPoint._direction = (Math.random() * 360).toFixed(2);
    newPoint._velocity = (Math.random() * (4 - 0.1) + 0.2).toFixed(2);
    newPoint._randomization = (Math.random() * (10 - 0) + 0).toFixed(2);
    aPoints.push(newPoint);
  }

  animate();
}

function animate() {
  for (let x = 0; x < numPoints; x++) {
    aPoints[x]._step(aPoints);
  }
  window.requestAnimFrame(animate);
  draw();
}

function draw() {
  ctx.save();

  ctx.clearRect(0, 0, width, height);

  for (let x = 0; x < numPoints; x++) {
    aPoints[x].draw(ctx);
  }

  ctx.restore();
}

function reportWindowSize() {
  width = window.innerWidth;
  height = window.innerHeight;
  can.setAttribute('width', width);
  can.setAttribute('height', height);
}

const Index = () => {
  const { t } = useTranslation('common');
  const [aboutRevealed, setAboutRevealed] = useState(false);

  const items = ['Header', 'About', 'Knowledge', 'Projects', 'Skills', 'Contact', 'Resources'];

  useEffect(() => {
    window.addEventListener('resize', reportWindowSize);
    init();
  }, []);

  return (
    <div className="bootstrap-wrapper">
      <NextSeo
        title={`Haris Smajlagić | ${t('h2')}`}
        description={t('description')}
        canonical="https://www.harisco.net/"
        openGraph={{
          url: 'https://www.harisco.net/',
          type: 'website',
          locale: 'en_IE',
          title: 'Haris Smajlagić - harisco.net',
          description: t('description'),
          images: [
            {
              url: 'https://www.harisco.net/profile.png',
              alt: 'Haris profile picture',
            },
          ],
          site_name: 'Harisco',
        }}
      />
      <Head>
        <link rel="alternate" href={root} hrefLang="x-default" />
        <link rel="alternate" href={root + '/de'} hrefLang="de"></link>
        <link rel="alternate" href={root + '/es'} hrefLang="es"></link>
        <link rel="alternate" href={root + '/bs'} hrefLang="bs"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <meta name="theme-color" content="#0e010f"></meta>
        <meta name="google-site-verification" content="n8epfyM3SsMEn88WcLcsci8zCmk4xwYSVV0Ir5P72Bo" />
        <link rel="icon" type="image/png" href="/logo.png"></link>
        <link rel="apple-touch-icon" href="/logo.png"></link>
        <link rel="mask-icon" href="/logo.png" color="#0e010f"></link>

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Cairo:300,400,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cairo:300,400,700&display=swap" media="print" onLoad="this.media='all'" />

        {isProd ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                                (function(a,b,c){var d=a.history,e=document,f=navigator||{},g=localStorage,
                                h=encodeURIComponent,i=d.pushState,k=function(){return Math.random().toString(36)},
                                l=function(){return g.cid||(g.cid=k()),g.cid},m=function(r){var s=[];for(var t in r)
                                r.hasOwnProperty(t)&&void 0!==r[t]&&s.push(h(t)+"="+h(r[t]));return s.join("&")},
                                n=function(r,s,t,u,v,w,x){var z="https://www.google-analytics.com/collect",
                                A=m({v:"1",ds:"web",aip:c.anonymizeIp?1:void 0,tid:b,cid:l(),t:r||"pageview",
                                sd:c.colorDepth&&screen.colorDepth?screen.colorDepth+"-bits":void 0,dr:e.referrer||
                                void 0,dt:e.title,dl:e.location.origin+e.location.pathname+e.location.search,ul:c.language?
                                (f.language||"").toLowerCase():void 0,de:c.characterSet?e.characterSet:void 0,
                                sr:c.screenSize?(a.screen||{}).width+"x"+(a.screen||{}).height:void 0,vp:c.screenSize&&
                                a.visualViewport?(a.visualViewport||{}).width+"x"+(a.visualViewport||{}).height:void 0,
                                ec:s||void 0,ea:t||void 0,el:u||void 0,ev:v||void 0,exd:w||void 0,exf:"undefined"!=typeof x&&
                                !1==!!x?0:void 0});if(f.sendBeacon)f.sendBeacon(z,A);else{var y=new XMLHttpRequest;
                                y.open("POST",z,!0),y.send(A)}};d.pushState=function(r){return"function"==typeof d.onpushstate&&
                                d.onpushstate({state:r}),setTimeout(n,c.delay||10),i.apply(d,arguments)},n(),
                                a.ma={trackEvent:function o(r,s,t,u){return n("event",r,s,t,u)},
                                trackException:function q(r,s){return n("exception",null,null,null,null,r,s)}}})
                                (window,"${GA_TRACKING_ID}",{anonymizeIp:true,colorDepth:true,characterSet:true,screenSize:true,language:true});
                            `,
            }}
          />
        ) : null}
      </Head>
      <div className="scrollspy">
        <Scrollspy items={items} currentClassName="is-current" style={{ padding: '5px 13px 8px 8px', margin: 0, listStyleType: 'none' }}>
          <li className="scrollspy-item">
            <AnchorLink href={`#${items[0]}`}>{t('Header')}</AnchorLink>
          </li>
          <li className="scrollspy-item">
            <AnchorLink href={`#${items[1]}`}>{t('About')}</AnchorLink>
          </li>
          <li className="scrollspy-item">
            <AnchorLink href={`#${items[2]}`}>{t('Knowledge')}</AnchorLink>
          </li>
          <li className="scrollspy-item">
            <AnchorLink href={`#${items[3]}`}>{t('Projects')}</AnchorLink>
          </li>
          <li className="scrollspy-item">
            <AnchorLink href={`#${items[4]}`}>{t('Skills')}</AnchorLink>
          </li>
          <li className="scrollspy-item">
            <AnchorLink href={`#${items[5]}`}>{t('Contact')}</AnchorLink>
          </li>
          <li className="scrollspy-item">
            <AnchorLink href={`#${items[6]}`}>{t('Resources')}</AnchorLink>
          </li>
        </Scrollspy>
      </div>
      <Header id={items[0]} />
      <Slide left onReveal={() => setAboutRevealed(true)}>
        <About id={items[1]} start={aboutRevealed} />
      </Slide>
      <Fade>
        <Knowledge
          id={items[2]}
          labels={[
            'HTML/5',
            'CSS/3',
            'Javascript',
            'Typescript',
            '.NET',
            'C#',
            'ASP.NET MVC',
            'NodeJS',
            'ExpressJS',
            'NextJS',
            'ES6/7/8/9',
            'GitHub',
            'BitBucket',
            'SEO',
            'TDD/BDD',
            'AWS',
            'NoSQL',
            'SQL',
            'GraphQL',
            'WAI-ARIA',
            'ReactJS',
            'jQuery',
            'VueJS',
            'Angular',
            'Redux',
            'Lodash',
            'Babel',
            'VSCode',
            'Visual Studio',
            'Java',
            'Ruby on Rails',
            'Shopify',
            'Bootstrap',
            'Matlab',
            'BitTorrent',
            'SOLID',
            'SSL/TLS',
            'Chrome extensions',
            'Text mining',
            'XML',
            'JSON',
            'Machine learning',
            'Atomic CSS',
            'BEM/SMACSS',
            'MomentJS',
            'PHP',
            'Fastify',
            'Textract',
            'DOM',
            'NPM',
            'VPN',
            'DD-WRT',
            'IPTV',
            'SignalR',
            'Progressive web apps',
            'UI/UX',
            'Bulma CSS',
            'Flexbox',
            'CSS Grid',
            'Microservices',
          ]}
        />
      </Fade>
      <Projects id={items[3]} />
      <Skills id={items[4]} />
      <Contact id={items[5]} />
      <Fade>
        <Resources id={items[6]} />
      </Fade>
      <Footer id="footer" />
      <style jsx>{`
        .scrollspy {
          position: fixed;
          display: inline-block;
          right: 0;
          bottom: 0;
          text-align: right;
          z-index: 9;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .scrollspy-item {
          line-height: 1.3;
        }
        @media (max-width: 768px) {
          .scrollspy {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Index;
