export type ContentProtectionOptions = {
  /** Whether to block common copy / print shortcuts (Ctrl/Cmd+C, P, S). Default: true */
  blockShortcuts?: boolean;
  /** Whether to block context menu (right‑click). Default: true */
  blockContextMenu?: boolean;
  /** Attempt to block basic screenshot key (PrintScreen). Best‑effort only. Default: true */
  blockScreenshotKey?: boolean;
};

/**
 * Enables basic client‑side content protection for a page.
 * Returns a cleanup function that removes all registered listeners.
 *
 * NOTE: This is a best‑effort layer and cannot fully prevent screenshots or copying,
 * but it helps discourage casual extraction of sensitive content.
 */
export function enableContentProtection(options: ContentProtectionOptions = {}): () => void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return () => {};
  }

  const {
    blockShortcuts = true,
    blockContextMenu = true,
    blockScreenshotKey = true,
  } = options;

  const handleContextMenu = (event: MouseEvent) => {
    if (!blockContextMenu) return;
    event.preventDefault();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!blockShortcuts && !blockScreenshotKey) return;

    const key = event.key.toLowerCase();
    const isModifier = event.ctrlKey || event.metaKey;

    // Block copy / print / save
    if (
      blockShortcuts &&
      isModifier &&
      (key === 'c' || key === 'p' || key === 's' || key === 'u')
    ) {
      event.preventDefault();
    }

    // Best‑effort, cannot stop OS‑level screenshots but we can respond to PrintScreen
    if (blockScreenshotKey && key === 'printscreen') {
      event.preventDefault();
      // Clear clipboard quickly after PrintScreen in some browsers
      try {
        if (navigator.clipboard && (navigator as any).clipboard?.writeText) {
          (navigator as any).clipboard.writeText('');
        }
      } catch {
        // Ignore errors – this is best‑effort only
      }
    }
  };

  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('keydown', handleKeyDown);
  };
}


