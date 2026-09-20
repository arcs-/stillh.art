export type TimelineEntry = {
  period: string
  where: string
  text: string
  link: {
    label: string
    to: string
  }
  side: 'left' | 'right'
}

export const timeline: TimelineEntry[] = [
  {
    period: '2025 - present',
    where: 'CH',
    text: 'Frontend Architect at',
    link: {
      label: 'DeepJudge',
      to: 'https://deepjudge.ai',
    },
    side: 'left',
  },
  {
    period: '2022 - 2025',
    where: 'CH',
    text: 'Frontend Circle Lead at',
    link: {
      label: 'novu',
      to: 'https://novu.ch',
    },
    side: 'right',
  },
  {
    period: '2019 - 3 Years',
    where: 'CH',
    text: 'Coding Websites and Apps at',
    link: {
      label: 'jkweb',
      to: 'https://jkweb.ch/',
    },
    side: 'right',
  },
  {
    period: '2017 - 3 Years',
    where: 'CH',
    text: 'B.Sc. in Informatics in Digital Ideation at',
    link: {
      label: 'Hochschule Luzern',
      to: 'https://www.hslu.ch/en/lucerne-school-of-information-technology/degree-programs/bachelor/digital-ideation/',
    },
    side: 'left',
  },
  {
    period: '2016 - 2 Months',
    where: 'USA',
    text: 'Established a new IT environment & forged a new website for',
    link: {
      label: 'Florentino Ice Cream',
      to: 'https://florentinoicecream.com/',
    },
    side: 'right',
  },
  {
    period: '2013 - 4 Years',
    where: 'CH',
    text: 'Automated testing at',
    link: {
      label: 'Credit Suisse',
      to: 'https://www.credit-suisse.com/',
    },
    side: 'left',
  },
]
