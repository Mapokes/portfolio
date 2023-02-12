export function scrollToContact(refToContact: React.RefObject<HTMLElement>): void {
  if (refToContact.current) {
    refToContact.current.scrollIntoView();
  }
}
