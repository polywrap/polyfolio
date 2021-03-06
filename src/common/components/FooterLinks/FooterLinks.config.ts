import RoutePath from 'common/modules/routing/routing.enums';
import {FooterLink} from './FooterLinks.types';

const footerLinks: FooterLink[] = [
  {
    title: 'polywrap',
    link: RoutePath.Polywrap,
  },
  {
    title: 'docs',
    link: RoutePath.Docs,
  },
  {
    title: 'roadmap',
    link: RoutePath.RoadMap,
  },
  {
    title: 'support',
    link: RoutePath.Support,
  },
];

export {footerLinks};
