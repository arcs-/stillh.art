type Topic = {
  label: string
  intro: string
  projects: Project[]
}
type Project = {
  title: string
  image: string
  description: string
  link?: {
    label: string
    target: string
  }
  team?: {
    [key: string]: string
  }
}

export const projects: Topic[] = [
  {
    label: 'Games',
    intro: 'Some of the game related projects I worked on. While most are a bit older I still think they are intressting.',
    projects: [
      {
        title: 'Outrun',
        image: '/images/outrun.png',
        description: 'In a discussion with a prof I got interested if one could create a game that would run smoothly within the browser only using HTML Elements.<br /><br />I tried to replicate Outrun from 1986 and really enjoy the result.',
        link: {
          label: 'Play',
          target: 'https://codepen.io/arcs/full/aGzNKY',
        },
      },
      {
        title: 'Glühbär',
        image: '/images/gluhbar.png',
        description: 'Three designers and I had an idea, a simple one. A bear with sleep issues but he could sleep when he drinks enough.<br /><br /> I got group lead and did all the code, thanks to my friends this game is marvelous.',
        team: {
          'Andrin (Design)': 'http://andrindobler.ch/',
          'Tin (Design)': 'https://www.vyelo.net/',
          'Geri (Design)': 'http://pixelfox.rocks/',
        },
      },
      {
        title: 'HUEBOO VR',
        image: '/images/hueboo.png',
        description: 'HUEBOO is a VR-Game in which you are the bartender, tasked with serving drinks to your thirsty customers. Its a game about music, light and agility.',
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
        title: 'Tree Builder',
        image: '/images/tree.png',
        description: 'In math we looked at L-Systems... and I was really bored. It was all way to simple and didn\'t even look interesting.<br /><br /> Therefore I opened CodePen and tried to get into more depth (haha, because 3D) with them, you can really fall in love with them.',
        link: {
          label: 'Try It',
          target: 'https://codepen.io/arcs/full/KeqbLd/',
        },
      },
      {
        title: 'Minesweeper Solver',
        image: '/images/mine.gif',
        description: 'Minesweeper is one of those games that is actually fun to play but somehow isn\'t. <br /><br /> It just interested me if one could cheat it... :)',
        link: {
          label: 'GitHub',
          target: 'https://github.com/arcs-/Minesweeper-Solver/',
        },
      },
      {
        title: 'Transmission',
        image: '/images/transmission.png',
        description: 'My first time at the Global Game Jam; 48h to code a game. I coded a custom engine and the game play, two friends did the art<br /><br /> In transmission you try to send a single through the solar system.',
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
        title: 'LoginRank for Bukkit (Minecraft)',
        image: '/images/loginrank.png',
        description: 'My first programm ever. It helped me manage my server and apperanly thousands others :) It allowed players to enter a password and receive a rank.',
        link: {
          label: 'Bukkit Page',
          target: 'https://dev.bukkit.org/projects/chat-loginrank-simple-password',
        },
      },
    ],
  },

  {
    label: 'Sites',
    intro: 'Here are some parts of the web that I developed, these are by far not all projects but a small sample what I want to share.',
    projects: [
      {
        title: '3D Configurator @ novu',
        image: '/images/kbs.png',
        description: 'Here I lead the development of this 3D configurator and frontend for a client. I also developed an extension that would allow the user to generate BIM data, Technical Drawings and previews from the newly configured product.',
        link: {
          label: 'Still in beta',
          target: 'https://neu.kabelschacht.ch/',
        },
      },
      {
        title: 'Serafin Krieger',
        image: '/images/serafin.png',
        description: 'An artist and friend needed a website, inspiered by his moving art we created a moving sphere as the main navigation. The most intressting part was figuring out how to render 2D text on to the sphere and how to make it compreensiable.',
        link: {
          label: 'Inspect',
          target: 'https://serafinkrieger.ch/',
        },
      },
      {
        title: 'Sozialversicherung @ novu',
        image: '/images/ahv.png',
        description: 'I\'m really proud to have been part of this project. Especially the animations and accessibility features are something I\'m really happy with but also just the spirit of the website to help self employed people to have social security.',
        link: {
          label: 'Check it out',
          target: 'https://selbststaendig-erwerbend.ch/',
        },
      },
      {
        title: 'bossbern @ novu',
        image: '/images/bossbern.png',
        description: 'One of my favorite pages that I built at novu with qturn togheter for an amazing company.',
        link: {
          label: 'Print something?',
          target: 'https://bossbern.ch/',
        },
      },
      {
        title: 'DI Museum',
        image: '/images/di.png',
        description: 'The DI Museum challanges the 2D only approach of websites and explores 3D worlds. It showcases the Bachelor projects of my fellow students. I has been written in 2 months as a replacement for the cancelled exhibition.',
        link: {
          label: 'Dive in',
          target: 'https://museum.stillh.art/',
        },
      },
      {
        title: 'keller-druck.ch @ novu',
        image: '/images/keller.png',
        description: 'My second project at novu and also the longest one, as I maintained it for several years. It has always been a pleasure to work with keller.',
        link: {
          label: 'How much pressure?',
          target: 'https://keller-druck.ch/',
        },
      },
      {
        title: 'My Wiki',
        image: '/images/docs.png',
        description: 'Remembering code is hard... I tried it, writing stuff down is easier. The wiki is a place where I keep the things I can\'t remember or want to share... as at this point most people looking at aren\'t me.',
        link: {
          label: 'Read up',
          target: 'https://wiki.stillh.art/',
        },
      },
      {
        title: 'Adminer Theme',
        image: '/images/adminer.png',
        description: 'Ahh Adminer. You are the best SQL manager out there. One file, so simple. Why on earth must you look like you\'re from 1970.<br /><br /> I took SCSS and the Material Design Guide and coded ahead. It\'s on GitHub now.',
        link: {
          label: 'GitHub',
          target: 'https://github.com/arcs-/Adminer-Material-Theme',
        },
      },
      {
        title: 'MatTab',
        image: '/images/mattab.png',
        description: 'Chrome has this nice new tab page but I can do one better. I\'ve never done a browser extension but this seemed like a good start.<br /><br /> Basically better Windows 8 tiles in Chrome.',
        link: {
          label: 'Chrome Store',
          target: 'https://chrome.google.com/webstore/detail/mattab/anfjeecbbmmjhbpopgnhibodoblgaakj',
        },
      },
    ],
  },
]
