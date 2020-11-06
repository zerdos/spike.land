import * as React from "react";
import { Octokit } from "@octokit/rest";

export const GithubCommits: React.FC = () => {
  const [state, setState] = React.useState({ data: "" });

  React.useEffect(() => {
    if (state.data === "") {
      (async () => {
        const octokit = new Octokit();
        const data = await octokit.repos.listCommits({
          owner: "zed-vision",
          repo: "zed-vision-site",
        });
        setState({ data: JSON.stringify(data) });
      })();
    }
  });

  return (
    <div>
      <pre>{state.data}</pre>
    </div>
  );
};
