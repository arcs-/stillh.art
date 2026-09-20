/* eslint-disable @stylistic/max-len */

export type Topic = {
  label: string
  intro: string
  projects: Project[]
}

export type Embed = {
  src: string
  width?: number
  height?: number
  frameHeight?: number
}

export type Project = {
  title: string
  frame?: 'phone'
  image: {
    src: string
    width: number
    height: number
  }
  image2?: {
    src: string
    width: number
    height: number
  }
  description: string
  embed?: Embed
  link?: {
    label: string
    target: string
  }
  team?: {
    [key: string]: string
  }
  stats?: Stat[]
}

export type Stat = {
  to: string
  created?: string
  loves?: number
  views?: number
  stars?: number
  downloads?: number
  users?: number
}

export const STATS_AS_OF = '2026-09-20'

export const projects: Topic[] = [
  {
    label: 'Work',
    intro: 'Things that are out there being used: sites built for clients and tools other people rely on.',
    projects: [
      {
        title: '3D Configurator @ novu',
        image: {
          src: '/images/kbs.png',
          width: 1637,
          height: 876,
        },
        description:
          'Here I led the development of this 3D configurator and frontend for a client. I also developed an extension that would allow the user to generate BIM data, Technical Drawings and previews from the newly configured product.',
        link: {
          label: 'you better buy one',
          target: 'https://neu.kabelschacht.ch/',
        },
      },
      {
        title: 'Serafin Krieger',
        image: {
          src: '/images/serafin.png',
          width: 1540,
          height: 940,
        },
        description:
          'An artist and friend needed a website, inspired by his moving art we created a moving sphere as the main navigation. The most interesting part was figuring out how to render 2D text on to the sphere and how to make it comprehensible.',
        link: {
          label: 'Inspect',
          target: 'https://serafinkrieger.ch/',
        },
      },
      {
        title: 'Sozialversicherung @ novu',
        image: {
          src: '/images/ahv.png',
          width: 1631,
          height: 1041,
        },
        description:
          "I'm really proud to have been part of this project. Especially the animations and accessibility features are something I'm really happy with but also just the spirit of the website to help self-employed people to have social security.",
        link: {
          label: 'Check it out',
          target: 'https://selbststaendig-erwerbend.ch/',
        },
      },
      {
        title: 'bossbern @ novu',
        image: {
          src: '/images/bossbern.png',
          width: 1332,
          height: 817,
        },
        description:
          'One of my favorite pages that I built at novu together with qturn for an amazing company.',
        link: {
          label: 'Print something?',
          target: 'https://bossbern.ch/',
        },
      },
      {
        title: 'DI Museum',
        image: {
          src: '/images/di.png',
          width: 1304,
          height: 694,
        },
        description:
          'The DI Museum challenges the 2D only approach of websites and explores 3D worlds. It showcases the Bachelor projects of my fellow students. It has been written in 2 months as a replacement for the cancelled exhibition.',
        link: {
          label: 'Dive in',
          target: 'https://museum.stillh.art/',
        },
      },
      {
        title: 'keller-druck.ch @ novu',
        image: {
          src: '/images/keller.png',
          width: 1545,
          height: 944,
        },
        description:
          'My second project at novu and also the longest one, as I maintained it for several years. It has always been a pleasure to work with keller.',
        link: {
          label: 'How much pressure?',
          target: 'https://keller-druck.ch/',
        },
      },
      {
        title: 'Tavolata',
        frame: 'phone',
        image: {
          src: '/images/tavolata.png',
          width: 1320,
          height: 2868,
        },
        image2: {
          src: '/images/tavolata2.png',
          width: 1170,
          height: 2532,
        },
        description:
          "A shared cookbook for the people you cook with. Save the recipes you actually want to eat, then swipe with your crew to pick tonight's dinner.",
        link: {
          label: 'Get cooking',
          target: 'https://tavolata.stillh.art/',
        },
      },
      {
        title: 'MatTab',
        image: {
          src: '/images/mattab.png',
          width: 1315,
          height: 720,
        },
        description:
          "Chrome has this nice new tab page but I can do one better. I've never done a browser extension but this seemed like a good start.<br /><br /> Basically better Windows 8 tiles in Chrome.",
        link: {
          label: 'Chrome Store',
          target: 'https://chrome.google.com/webstore/detail/mattab/anfjeecbbmmjhbpopgnhibodoblgaakj',
        },
        stats: [
          {
            to: 'https://chromewebstore.google.com/detail/mattab/anfjeecbbmmjhbpopgnhibodoblgaakj',
            created: '2018-11-10', // first commit of github.com/arcs-/MatTab; the store shows no release date
            users: 105,
          },
        ],
      },
      {
        title: 'My Wiki',
        image: {
          src: '/images/docs.png',
          width: 3153,
          height: 1956,
        },
        description:
          "Remembering code is hard... I tried it, writing stuff down is easier. The wiki is a place where I keep the things I can't remember or want to share... as at this point most people looking at it aren't me.",
        link: {
          label: 'Read up',
          target: 'https://wiki.stillh.art/',
        },
      },
      {
        title: 'Adminer Theme',
        image: {
          src: '/images/adminer.png',
          width: 1317,
          height: 693,
        },
        description:
          "Ahh Adminer. You are the best SQL manager out there. One file, so simple. Why on earth must you look like you're from 1970.<br /><br /> I took SCSS and the Material Design Guide and coded ahead. It's on GitHub now.",
        link: {
          label: 'GitHub',
          target: 'https://github.com/arcs-/Adminer-Material-Theme',
        },
        stats: [
          {
            to: 'https://github.com/arcs-/Adminer-Material-Theme',
            created: '2015-11-29',
            stars: 65,
          },
        ],
      },
      {
        title: 'MediumButton',
        image: {
          src: '/images/medium-button.png',
          width: 1066,
          height: 279,
        },
        description:
          'Extends MediumEditor with your own custom toolbar buttons, while keeping the default ones.<br /><br />Available on npm as medium-button.',
        link: {
          label: 'GitHub',
          target: 'https://github.com/arcs-/medium-button',
        },
        stats: [
          {
            to: 'https://github.com/arcs-/medium-button',
            created: '2015-02-24',
            stars: 83,
          },
        ],
      },
      {
        title: 'LoginRank for Bukkit (Minecraft)',
        image: {
          src: '/images/loginrank.png',
          width: 797,
          height: 451,
        },
        description:
          'My first program ever. It helped me manage my server and apparently thousands of others :) It allowed players to enter a password and receive a rank.',
        link: {
          label: 'Bukkit Page',
          target: 'https://dev.bukkit.org/projects/chat-loginrank-simple-password',
        },
        stats: [
          {
            to: 'https://dev.bukkit.org/projects/chat-loginrank-simple-password',
            created: '2012-04-03',
            downloads: 17635,
          },
        ],
      },
    ],
  },
  {
    label: 'Lab',
    intro: 'Personal experiments, games and pens. Made for fun, some of them got around.',
    projects: [
      {
        title: 'Outrun',
        image: {
          src: '/images/outrun.png',
          width: 3140,
          height: 1956,
        },
        description:
          'In a discussion with a prof I got interested if one could create a game that would run smoothly within the browser only using HTML Elements.<br /><br />I tried to replicate Outrun from 1986 and really enjoy the result.',
        embed: {
          src: 'https://codepen.io/arcs/embed/aGzNKY?default-tab=result',
          // codepen header 51 + game 557; the pen needs a viewport >= 800 to not scroll
          width: 800,
          height: 608,
          frameHeight: 900,
        },
        link: {
          label: 'Play',
          target: 'https://codepen.io/arcs/full/aGzNKY',
        },
        stats: [
          {
            to: 'https://codepen.io/arcs/pen/aGzNKY',
            created: '2018-04-19',
            loves: 420,
            views: 18460,
          },
        ],
      },
      {
        title: 'Space Invaders',
        image: {
          src: '/images/space-invaders.jpg',
          width: 1280,
          height: 720,
        },
        description:
          'Business managers are about to invade our town! A Space Invaders clone on a canvas, defending an ASCII skyline.<br /><br />It started in 2015 as the game behind my 404 page and was forked in 2018 into this version. Use ← → to move and space to shoot.',
        embed: {
          src: 'https://codepen.io/arcs/embed/XqmKYq?default-tab=result',
          // codepen header 51 + canvas page 647
          width: 1216,
          height: 700,
          frameHeight: 740,
        },
        link: {
          label: 'Play',
          target: 'https://codepen.io/arcs/full/XqmKYq',
        },
        stats: [
          {
            to: 'https://codepen.io/arcs/pen/vOwJBw',
            created: '2015-08-17',
            loves: 289,
            views: 34674,
          },
          {
            to: 'https://codepen.io/arcs/pen/XqmKYq',
            created: '2018-04-21',
            loves: 5,
            views: 408,
          },
        ],
      },
      {
        title: 'Happy Birthday',
        image: {
          src: '/images/happy-birthday.jpg',
          width: 1280,
          height: 720,
        },
        description:
          'Canvas fireworks bursting over a birthday greeting.<br /><br />By a wide margin my most viewed pen.',
        embed: {
          src: 'https://codepen.io/arcs/embed/XKKYZW?default-tab=result',
        },
        link: {
          label: 'Open',
          target: 'https://codepen.io/arcs/full/XKKYZW',
        },
        stats: [
          {
            to: 'https://codepen.io/arcs/pen/XKKYZW',
            created: '2016-06-16',
            loves: 755,
            views: 142469,
          },
        ],
      },
      {
        title: '~',
        image: {
          src: '/images/tilde.jpg',
          width: 1280,
          height: 720,
        },
        description:
          "Bugs are corrupting your home directory. A tiny terminal-styled shooter drawn entirely from characters on a canvas.<br /><br />Arrow keys to move, S to shoot, once you've sudo-enabled the gun.",
        embed: {
          src: 'https://codepen.io/arcs/embed/LqGdWG?default-tab=result',
        },
        link: {
          label: 'Play',
          target: 'https://codepen.io/arcs/full/LqGdWG',
        },
        stats: [
          {
            to: 'https://codepen.io/arcs/pen/LqGdWG',
            created: '2019-01-25',
            loves: 14,
            views: 728,
          },
        ],
      },
      {
        title: 'Simple register form',
        image: {
          src: '/images/register-form.jpg',
          width: 1280,
          height: 720,
        },
        description:
          'A register form that asks one question at a time, with CSS animations between the steps.<br /><br />Design after a Dribbble shot by Xavier Coulombe-M.',
        embed: {
          src: 'https://codepen.io/arcs/embed/OmZaex?default-tab=result',
        },
        link: {
          label: 'Open',
          target: 'https://codepen.io/arcs/full/OmZaex',
        },
        stats: [
          {
            to: 'https://codepen.io/arcs/pen/OmZaex',
            created: '2017-05-13',
            loves: 682,
            views: 58421,
          },
        ],
      },
      {
        title: 'Good Night',
        image: {
          src: '/images/good-night.jpg',
          width: 1280,
          height: 720,
        },
        description:
          'A starry night over the dunes: a canvas sky with twinkling stars and constellation lines.',
        embed: {
          src: 'https://codepen.io/arcs/embed/edzJxJ?default-tab=result',
        },
        link: {
          label: 'Open',
          target: 'https://codepen.io/arcs/full/edzJxJ',
        },
        stats: [
          {
            to: 'https://codepen.io/arcs/pen/edzJxJ',
            created: '2016-09-16',
            loves: 172,
            views: 13500,
          },
        ],
      },
      {
        title: 'Tree Builder',
        image: {
          src: '/images/tree.png',
          width: 1252,
          height: 691,
        },
        description:
          "In math we looked at L-Systems... and I was really bored. It was all way too simple and didn't even look interesting.<br /><br /> Therefore I opened CodePen and tried to get into more depth (haha, because 3D) with them, you can really fall in love with them.",
        embed: {
          src: 'https://codepen.io/arcs/embed/KeqbLd?default-tab=result',
        },
        link: {
          label: 'Try It',
          target: 'https://codepen.io/arcs/full/KeqbLd/',
        },
        stats: [
          {
            to: 'https://codepen.io/arcs/pen/KeqbLd',
            created: '2018-06-13',
            loves: 11,
            views: 935,
          },
        ],
      },
      {
        title: 'Glühbär',
        image: {
          src: '/images/gluhbar.png',
          width: 1117,
          height: 692,
        },
        description:
          'Three designers and I had an idea, a simple one. A bear with sleep issues but he could sleep when he drinks enough.<br /><br /> I was group lead and did all the code, thanks to my friends this game is marvelous.',
        team: {
          'Andrin (Design)': 'http://andrindobler.ch/',
          'Tin (Design)': 'https://www.vyelo.net/',
          'Geri (Design)': 'http://pixelfox.rocks/',
        },
      },
      {
        title: 'HUEBOO VR',
        image: {
          src: '/images/hueboo.png',
          width: 1235,
          height: 693,
        },
        description:
          "HUEBOO is a VR-Game in which you are the bartender, tasked with serving drinks to your thirsty customers. It's a game about music, light and agility.",
        link: {
          label: 'Trailer',
          target: 'https://www.youtube.com/watch?v=b23qYNQ274g',
        },
        team: {
          'Seline (Design)': 'https://www.georgeluni.ch/',
          'Yannick (Code)': '',
        },
      },
      {
        title: 'Minesweeper Solver',
        image: {
          src: '/images/mine.gif',
          width: 600,
          height: 338,
        },
        description:
          "Minesweeper is one of those games that is actually fun to play but somehow isn't. <br /><br /> It just interested me if one could cheat it... :)",
        link: {
          label: 'GitHub',
          target: 'https://github.com/arcs-/Minesweeper-Solver/',
        },
        stats: [
          {
            to: 'https://github.com/arcs-/Minesweeper-Solver/',
            created: '2016-01-03',
            stars: 7,
          },
        ],
      },
      {
        title: 'Transmission',
        image: {
          src: '/images/transmission.png',
          width: 1111,
          height: 688,
        },
        description:
          'My first time at the Global Game Jam; 48h to code a game. I coded a custom engine and the gameplay, two friends did the art<br /><br /> In Transmission you try to send a signal through the solar system.',
        link: {
          label: 'Play',
          target: 'https://stillh.art/project/transmission/',
        },
        team: {
          'Lukas (Design)': 'https://twitter.com/Moe5i',
          'Simon (Design)': 'http://simon-wirth.ch',
        },
      },
      {
        title: 'Waypoints',
        image: {
          src: '/images/waypoints.png',
          width: 1505,
          height: 857,
        },
        description:
          'Waypoints turns a Proton Photos album into a map. It reads the album, decrypts everything locally, and lays the geotagged photos out as a timeline of the places you stopped.<br /><br /> I built it for my own travel photos, so it runs on your machine and never sends anything to a server.',
        link: {
          label: 'GitHub',
          target: 'https://github.com/arcs-/waypoints',
        },
        stats: [
          {
            to: 'https://github.com/arcs-/waypoints',
            created: '2026-07-03',
            stars: 1,
          },
        ],
      },
    ],
  },
]
