import React, { useMemo, useState } from "react";
import { ReactFlow, Background, BackgroundVariant, Handle, Position, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { hoverTick } from "./sound";

const RED = "#dd2316";
const RED_BRIGHT = "#ff3a2a";
const SECOND = "#8a857f";

function LayerNode({ data }) {
  return (
    <div
      style={{
        width: 196,
        background: "rgba(8,8,8,0.92)",
        border: `1px solid ${data.crisis ? RED_BRIGHT : "rgba(221,35,22,0.45)"}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <Handle id="t" type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="b" type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle id="r" type="source" position={Position.Right} style={{ opacity: 0 }} />
      <p style={{ color: data.crisis ? RED_BRIGHT : RED, fontSize: 11, letterSpacing: 1, marginBottom: 7 }}>{data.title}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {data.items.map((it) => (
          <span key={it} style={{ fontSize: 9, color: SECOND, border: "1px solid rgba(236,232,227,0.12)", borderRadius: 4, padding: "2px 5px" }}>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

const nodeTypes = { layer: LayerNode };

const BASE_NODES = [
  { id: "frontend", type: "layer", position: { x: -10, y: 0 }, data: { title: "REACT FRONTEND", items: ["Pages", "Components", "Contexts", "API services"] } },
  { id: "backend", type: "layer", position: { x: 270, y: 0 }, data: { title: "FASTAPI BACKEND", items: ["Routers", "Services", "Engines", "Tasks"] } },
  { id: "infra", type: "layer", position: { x: 550, y: 0 }, data: { title: "INFRASTRUCTURE", items: ["Docker", "Vercel", "Railway", "Supabase"] } },
  { id: "database", type: "layer", position: { x: 130, y: 190 }, data: { title: "POSTGRESQL", items: ["10 tables", "Alembic", "asyncpg"] } },
  { id: "aiml", type: "layer", position: { x: 410, y: 190 }, data: { title: "AI / ML LAYER", items: ["Keyword ~65%", "XLNet ~88%", "Ollama Cloud"] } },
];

const BASE_EDGES = [
  { id: "f-b", source: "frontend", target: "backend", sourceHandle: "r", targetHandle: "l", label: "REST · SSE" },
  { id: "b-infra", source: "backend", target: "infra", sourceHandle: "r", targetHandle: "l", label: "deploy" },
  { id: "b-db", source: "backend", target: "database", sourceHandle: "b", targetHandle: "t", label: "SQLAlchemy" },
  { id: "b-ai", source: "backend", target: "aiml", sourceHandle: "b", targetHandle: "t", label: "engines" },
];

export default function ArchitectureMap({ nodes: nIn, edges: eIn }) {
  const baseEdges = eIn && eIn.length ? eIn : BASE_EDGES;
  const [hovered, setHovered] = useState(null);
  const [nodes, , onNodesChange] = useNodesState(nIn && nIn.length ? nIn : BASE_NODES);

  const edges = useMemo(
    () =>
      baseEdges.map((e) => {
        const active = !hovered || e.source === hovered || e.target === hovered;
        return {
          ...e,
          animated: active,
          style: { stroke: active ? RED : "rgba(221,35,22,0.13)", strokeWidth: active ? 1.5 : 1 },
          labelStyle: { fill: active ? SECOND : "rgba(138,133,127,0.3)", fontSize: 9, fontFamily: "'JetBrains Mono', monospace" },
          labelBgStyle: { fill: "#000", fillOpacity: 0.7 },
        };
      }),
    [hovered, baseEdges]
  );

  return (
    <div className="relative mb-6 h-[440px] w-full overflow-hidden rounded-md border sm:h-[560px]" style={{ borderColor: "rgba(236,232,227,0.14)", backgroundColor: "rgba(0,0,0,0.4)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        minZoom={0.4}
        maxZoom={1.6}
        preventScrolling={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        panOnDrag={false}
        nodesConnectable={false}
        elementsSelectable={false}
        onNodeMouseEnter={(_, n) => {
          setHovered(n.id);
          hoverTick();
        }}
        onNodeMouseLeave={() => setHovered(null)}
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(221,35,22,0.16)" />
      </ReactFlow>
      <p className="pointer-events-none absolute bottom-2 right-3 text-[10px]" style={{ color: "#4f4a45" }}>hover a layer · drag nodes to rearrange</p>
    </div>
  );
}
