export function reveal(node: HTMLElement) {
  node.classList.add('reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('revealed');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  observer.observe(node);
  return { destroy: () => observer.disconnect() };
}

export function revealChildren(node: HTMLElement) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('revealed');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  for (const child of node.children) {
    (child as HTMLElement).classList.add('reveal');
    observer.observe(child);
  }
  return { destroy: () => observer.disconnect() };
}
