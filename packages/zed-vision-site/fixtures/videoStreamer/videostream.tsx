import React from "react";
import { SEO } from "../components/seo";
import { graphql } from "gatsby";
import { Streamer } from "../components/videoStreamer/VideoStreamer";

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  location: Location;
}

const VideoStreamingPage = ({ data, location }: Props) => {
  const magnet =
    "magnet:?xt=urn:btih:b87ed3b80680ff7d2f97b61812f10b53d580496a&dn=The.Devil.All.the.Time.2020.1080p.NF.WEB-DL.DDP5.1.Atmos.x264-CMRG&tr=http%3A%2F%2Ft.ncore.sh%3A2710%2Fb48a71a436a207570717e70013dd39b0%2Fannounce";

  return (
    <React.Fragment>
      <SEO title="Stream something from here :)" />
      <Streamer magnetURL={magnet} />
    </React.Fragment>
  );
};

export default VideoStreamingPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
