// Share utilities
export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => false);
  }

  // Fallback for older browsers
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return Promise.resolve(successful);
  } catch {
    return Promise.resolve(false);
  }
}

// Social media share URLs
export function getTwitterShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text: text,
    url: url,
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function getLinkedInShareUrl(url: string): string {
  const params = new URLSearchParams({
    url: url,
  });
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

// Check if Web Share API is available
export function isWebShareSupported(): boolean {
  if (typeof window === "undefined") return false;
  return typeof navigator !== "undefined" && "share" in navigator;
}

// Use Web Share API for native sharing (includes LinkedIn if installed)
export async function shareViaWebAPI(data: { text: string; url?: string }): Promise<boolean> {
  if (!isWebShareSupported()) return false;
  
  try {
    await navigator.share(data);
    return true;
  } catch {
    // User cancelled or error occurred
    return false;
  }
}
