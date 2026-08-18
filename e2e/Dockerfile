# Isolated DSH web runtime for plugin E2E. The DSH version is pinned to the
# version this plugin declares compatibility with (peerDependencies).
ARG NODE_IMAGE=node:24-slim
FROM ${NODE_IMAGE}

# DSH depends on node-pty, which compiles natively: node-gyp needs these.
# socat relays dsh's loopback-only server to a publishable interface (dsh
# refuses to bind anything but 127.0.0.1). npm >= 11.5 blocks install
# scripts unless allowlisted; DSH's native deps need them.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ socat \
  && rm -rf /var/lib/apt/lists/*

ARG DSH_VERSION=0.1.0-rc.7
ARG PNPM_VERSION=11
RUN npm install -g --no-fund --no-audit \
  --allow-scripts=@deepseek-ai/dsh-subprocess-local,koffi,node-pty,@google/genai,protobufjs \
  pnpm@${PNPM_VERSION} @deepseek-ai/dsh@${DSH_VERSION}

# Keep the run hermetic: telemetry off, throwaway home inside the container.
ENV DSH_TELEMETRY_MODE=DISABLED
ENV DSH_HOME=/data/dsh
RUN mkdir -p /data/workspace
WORKDIR /data/workspace

EXPOSE 3081
# The orchestrator overrides this with dynamic --port/--trusted-host flags;
# it starts socat (0.0.0.0:3081 -> 127.0.0.1:3080) alongside dsh web.
CMD ["dsh", "web", "--host", "127.0.0.1", "--port", "3080"]
