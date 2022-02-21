import RoutePath from 'common/modules/routing/routing.enums';
import {FooterLink} from './FooterLinks.types';

const footerLinks: FooterLink[] = [
  {
    title: 'polywrap',
    link: RoutePath.BaseRoute,
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
