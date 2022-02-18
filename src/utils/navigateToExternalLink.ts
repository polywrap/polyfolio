export default function navigateToExternalLink({
  event,
  link,
  isExternal,
}: {
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  link: string;
  isExternal: boolean;
}) {
  if (isExternal) {
    event.stopPropagation();
    event.preventDefault();

    window.open(link, '_blank');
  }
}
