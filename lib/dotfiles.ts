export const dotConfig = {
  repoUrl: "https://github.com/Edlison/.dotfiles",
  installUrl: "https://iid.sh/tools/dot/install",
  installCommand: "curl -fsSL https://iid.sh/tools/dot/install | bash",
  tagline: "Dotfiles",
  description:
    "AI-native dotfiles for managing shell profiles, environment variables, tool configuration, and terminal defaults in one place.",
} as const;

export interface Feature {
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    title: "AI-Native Config Layer",
    description:
      "Manage AI tooling, profile state, environment variables, and local configuration as one coherent system.",
  },
  {
    title: "All-in-One Management",
    description:
      "Keep shell, editor, tmux, git, SSH, and machine-level defaults under version-controlled dotfiles.",
  },
  {
    title: "ZSH Baseline",
    description:
      "Built on zsh and oh-my-zsh, with aliases, settings, and environment variables split into modular files.",
  },
  {
    title: "Profile And Environment",
    description:
      "Centralize profile setup, exported variables, and repeatable machine bootstrap details for AI-native work.",
  },
  {
    title: "Terminal Defaults",
    description:
      "Ship with practical tmux, vim, git, and SSH defaults so a new terminal starts from a known baseline.",
  },
  {
    title: "Optional Extensions",
    description:
      "Stay lightweight by default, then add extras such as pyenv, uv, or other local tools through extensions.",
  },
];
