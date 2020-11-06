import * as React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import AVLTree from "avl";

import styled from "@emotion/styled";

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

const Rotated = styled.div` 
  height: 600px;
  display: block;
  width: 600px;
  position: relative;
  border: 4px solid black;
`;

const NotFoundPage = ({ data, location }: Props) => {
  const [{ avl }, changeTree] = React.useState(
    { avl: new AVLTree<number, false>(undefined, true) },
  );

  React.useEffect(() => {
    changeTree(({ avl }) => {
      avl.insert(1);

      avl.insert(2);
      avl.insert(3);
      avl.insert(4);
      avl.insert(5);
      avl.insert(6);

      avl.insert(7);
      avl.insert(8);
      avl.insert(9);
      avl.insert(10);
      avl.insert(11);
      avl.insert(12);
      avl.insert(13);
      avl.insert(14);
      avl.insert(15);
      avl.insert(16);

      return { avl };
    });

    // changeTree((t) => {  const { avl } = t; avl.insert(1); avl.insert(2); avl.insert(4); return {...t, avl };  });

    // const interval =
    // setTimeout(() => {
    //   // const newNum = Math.round(Math.random() * 100000);

    //   // const insert =  ?(avl.maxNode().key! + 10) :2 ;

    //   changeTree((t) => {
    //     const { avl } = t;

    //     // for (let kk = 1; kk<1000; kk++){

    //     // console.log("use the INTERVAL", insert);
    //     avl.insert(4);

    //     avl.insert(Math.round(Math.random() * 100000));

    //     ///}

    //     return { ...t, avl };
    //   });
    // }, 1000);

    return () => {
      // clearInterval(interval);
      // avl.destroy();
    };
  }, []);

  let res = [];
  if (avl.minNode()) {
    const surface: any = (
      minNode: any,
      maxNode: any,
    ) => [
      ...((minNode && [minNode.key]) || ["-"]),
      ...(((minNode || maxNode) &&
        (minNode !== maxNode) &&
        surface(minNode && minNode.parent, maxNode && maxNode.parent)) ||
        ["*"]),

      ...((maxNode && maxNode !== minNode && [maxNode.key]) || ["-"]),
    ];

    res = surface(avl.minNode(), avl.maxNode()).filter((k: number) =>
      Number.isInteger(k)
    );
  }

  //@ts-ignore
  const getRoot = (node) =>
    (node && node.parent !== null)
      ? getRoot(node.parent)
      : (node || { key: 0 });
  // const max = avl.maxNode() && avl.maxNode().key && avl.maxNode().key;

  // console.log(max);

  /* const h1 = res.length>3 : [] */

  type Node = {
    left: Node;
    right: Node;
    parent: Node;
    key: number;
  };

  //
  //   456
  //   23
  //   1
  const ReqPrint = (
    { node, topLevel, left, level }: {
      node: Node;
      topLevel: number;
      left: number;
      level: number;
    },
  ) =>
    <>
      <div style={{ position: "absolute", top: topLevel * 60, left }}>
        {node.key}
      </div>
      {node.right &&
        <ReqPrint
          node={node.right}
          left={left + 256 / Math.pow(2, level)}
          topLevel={topLevel}
          level={level + 1}
        />}
      {node.left &&
        <ReqPrint
          node={node.left}
          left={left}
          topLevel={topLevel + 1}
          level={level + 1}
        />}
    </>;
  // <>
  {/* <ItemContainer>{node.key}</ItemContainer> */}
  {/* {node.right &&<><RedBlock><ReqPrint node={node.right} /></RedBlock></>} */}
  {/* {node.left &&<><br /><BlueBlock><ReqPrint node={node.left} /></BlueBlock></>} */}
  // </>;

  const root = getRoot(avl.maxNode());

  return (
    <Layout>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>

      <Rotated key={res.toString()}>
        <ReqPrint node={root} topLevel={0} left={0} level={0} />
        {/* {res.slice((res.length + 1) / 2).filter((k: number) =>
          Number.isInteger(k)
        ).map((k: number | string, ind: number) =>
          <RedBlock key={`${k}-${ind}`}>{String(k)}</RedBlock>
        )}
        {res.slice(0, (res.length - 1) / 2).reverse().filter((k: number) =>
          Number.isInteger(k)
        ).map((k: number | string, ind: number) =>
          <BlueBlock key={`${k}-${ind}`}>{String(k)}</BlueBlock>
        )} */}
      </Rotated>
      <p>You just hit a route that not exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
