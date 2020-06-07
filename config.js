'use strict';

module.exports = {
  url: 'https://www.spencerkline.tech',
  pathPrefix: '/',
  title: 'Spencer Kline Blog',
  subtitle: 'All posts written by Spencer Kline. Site built with gatsby-starter-lumen.',
  copyright: '© All rights reserved.',
  disqusShortname: 'spencerkline-blog',
  postsPerPage: 5,
  googleAnalyticsId: 'UA-168011190-1',
  useKatex: false,
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'Projects',
      path: '/pages/projects'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
  ],
  author: {
    name: 'Spencer Kline',
    photo: '/photo.jpg',
    bio: 'Web developer and tech enthusiast from North Carolina',
    contacts: {
      email: 'dskline1@gmail.com',
      facebook: '',
      telegram: '',
      twitter: 'SpencerKlineDev',
      github: 'dskline',
      rss: 'https://www.spencerkline.tech/rss.xml',
      vkontakte: '',
      linkedin: '',
      instagram: '',
      line: '',
      gitlab: '',
      weibo: '',
      codepen: '',
      youtube: '',
      soundcloud: '',
    }
  }
};
