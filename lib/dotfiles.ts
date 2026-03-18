export const dotConfig = {
  repoUrl: "https://github.com/Edlison/.dotfiles",
  installUrl: "https://dot.iid.sh/install",
  installCommand: "curl -fsSL https://dot.iid.sh/install | bash",
  tagline: "Dotfiles",
  description:
    "Personal dotfiles managed with zsh and oh-my-zsh. Clone, symlink, and go — one command sets up your entire shell environment.",
} as const;

export interface Feature {
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    title: "oh-my-zsh Bootstrap",
    description:
      "Automatically installs oh-my-zsh if not present, giving you a rich shell experience out of the box.",
  },
  {
    title: "Symlinked Configs",
    description:
      "Creates symlinks for .gitconfig, .tmux.conf, .vimrc, and .zshrc — version-controlled and clean.",
  },
  {
    title: "Modular ZSH",
    description:
      "Settings, aliases, and environment variables split into separate files under zsh/ for easy customization.",
  },
  {
    title: "Git & SSH Ready",
    description:
      "Ships with .gitconfig and SSH config patterns for GitHub — drop in your key and go.",
  },
  {
    title: "Tmux & Vim",
    description:
      "Pre-configured .tmux.conf and .vimrc for a productive terminal workflow from day one.",
  },
  {
    title: "Optional Extensions",
    description:
      "Lightweight by default. Install extras like pyenv and uv on demand via extensions/install.sh.",
  },
];
