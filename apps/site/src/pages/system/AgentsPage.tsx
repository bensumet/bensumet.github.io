import { useEffect, useState } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { CodeBlock, Columns, EdgeCard, Lead, Measure, RuleItem, RuleList, Section, Tag } from '@bensumet/edge';
import { Opener } from '../../components/Layout';
import { href } from '../../router';

interface RuleMeta { name: string; kind: string; summary: string; url: string }
interface Pair { mode: string; fg: string; bg: string; ratio: number; needs: number; passes: boolean }

const base = `${import.meta.env.BASE_URL}edge/`;

const files = [
  { file: 'llms.txt', href: `${import.meta.env.BASE_URL}llms.txt`, what: 'The index an agent reads first, at the site root: what Edge is, where every rule and token lives.' },
  { file: 'tokens.json', what: 'Every color, font, size and space in the W3C Design Tokens format.' },
  { file: 'tokens.css', what: 'The same tokens as CSS custom properties, for pages outside React.' },
  { file: 'contrast.json', what: 'Every text, control and accent pair the UI relies on, with its measured contrast ratio.' },
  { file: 'rules/index.json', what: 'The rules files as data: name, kind and a one-line summary each.' },
];

const mcpTools = [
  { name: 'get_tokens', what: 'Colors, type, spacing and radius for one mode (ink or paper) and accent.' },
  { name: 'get_component_guidance', what: 'One component\u2019s rules, with the foundations every screen follows. Without a name, the list of components.' },
  { name: 'check_contrast', what: 'The WCAG ratio between two colors, as hex or tokens like ink.text, and whether it passes for text, large text or a control.' },
];

const connect = `claude mcp add edge -- node --experimental-strip-types \\
  --no-warnings packages/edge/mcp/server.mjs`;

// Captured from packages/edge/mcp/demo.mjs; the same calls run in the test suite.
const exchange = `> check_contrast
  { "foreground": "#9AA0A6", "background": "#FFFFFF" }

{ "ratio": 2.64, "needs": 4.5, "passes": false, "level": "Fail" }

> check_contrast
  { "foreground": "paper.muted", "background": "paper.surface" }

{ "ratio": 7.68, "needs": 4.5, "passes": true, "level": "AAA" }`;

const prompt = `Before writing any UI, read ${typeof window !== 'undefined' ? window.location.origin : ''}${import.meta.env.BASE_URL}llms.txt and follow its rules. Read colors only from the theme, meet WCAG AA, and use Edge components before writing new ones.`;

function useJson<T>(path: string): T | null {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    let live = true;
    fetch(base + path).then((r) => (r.ok ? r.json() : null)).then((d) => live && setData(d)).catch(() => live && setData(null));
    return () => { live = false; };
  }, [path]);
  return data;
}

export default function AgentsPage() {
  const rules = useJson<RuleMeta[]>('rules/index.json');
  const pairs = useJson<Pair[]>('contrast.json');
  const passing = pairs?.filter((p) => p.passes).length ?? 0;

  return (
    <>
      <Opener eyebrow="For agents" bold="Readable by machines," italic="not just people.">
        <Lead opening="Teams reach for an AI assistant">
          before they open the docs. If a design system isn't legible to AI, it quietly gets bypassed and the product drifts toward generic.
          So Edge publishes its rules and tokens as data an agent can read, generated from the same source as the code.
        </Lead>
      </Opener>

      <Section id="published" title="What Edge publishes">
        <RuleList>
          {files.map((f) => (
            <RuleItem key={f.file} preset="asideWide" space={2}>
              <Link variant="mono" href={'href' in f ? f.href : base + f.file}>{f.file}</Link>
              <Typography color="text.secondary">{f.what}</Typography>
            </RuleItem>
          ))}
        </RuleList>
      </Section>

      <Section id="rules" title="The rules" intro={<>
        One short file per component or family: when to use it, when not to, its props, and its accessibility requirements. A test fails the build if
        a component ships without one.
      </>}>
        {rules ? (
          <Columns gap={2}>
            {rules.map((r) => (
              <EdgeCard key={r.url} variant="outlined" sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={1.5} alignItems="baseline" sx={{ mb: 1 }}>
                  <Link variant="label" href={base + r.url}>{r.name}</Link>
                  <Tag>{r.kind}</Tag>
                </Stack>
                <Typography variant="body2" color="text.secondary">{r.summary}</Typography>
              </EdgeCard>
            ))}
          </Columns>
        ) : (
          <Typography color="text.secondary" role="status">Loading the rules…</Typography>
        )}
      </Section>

      <Section id="mcp" title="Ask Edge directly: the MCP server" intro={<>
        Files are good for reading; a server is better for asking. Edge&rsquo;s MCP server gives an AI assistant three tools and keeps its
        context small: it asks for one component&rsquo;s rules or one mode&rsquo;s tokens instead of loading everything. It reads the same
        sources as the code and the tests, so it can&rsquo;t drift.
      </>}>
        <RuleList sx={{ mb: 4 }}>
          {mcpTools.map((t) => (
            <RuleItem key={t.name} preset="asideWide" space={2}>
              <Typography variant="mono">{t.name}</Typography>
              <Typography color="text.secondary">{t.what}</Typography>
            </RuleItem>
          ))}
        </RuleList>
        <Columns gap={4}>
          <Box>
            <Typography variant="eyebrow">Connect it</Typography>
            <Measure as={Typography} sx={{ mt: 1, mb: 1.5 }}>
              The repo&rsquo;s <code>.mcp.json</code> registers it for Claude Code when you open the repo. Anywhere else, one command:
            </Measure>
            <CodeBlock label="Command to connect the server">{connect}</CodeBlock>
          </Box>
          <Box>
            <Typography variant="eyebrow">A real exchange</Typography>
            <Measure as={Typography} sx={{ mt: 1, mb: 1.5 }}>
              Before using a gray it picked for helper text, a client asks the server. The answer is unedited, apart from shortening.
            </Measure>
            <CodeBlock label="Example exchange with the server">{exchange}</CodeBlock>
          </Box>
        </Columns>
      </Section>

      <Columns as="section" aria-labelledby="try" gap={4} sx={{ mt: 8 }}>
        <Box>
          <Typography id="try" variant="h3" component="h2" sx={{ mb: 1 }}>Using it with an AI assistant</Typography>
          <Measure as={Typography} color="text.secondary">
            Point a coding assistant at the index once, in its project instructions. It then reads the rules for the components it's about to use,
            instead of guessing from memory.
          </Measure>
        </Box>
        <CodeBlock label="Project instructions for an AI assistant" wrap>{prompt}</CodeBlock>
      </Columns>

      <Columns as="section" aria-labelledby="honest" gap={4} sx={{ mt: 8 }}>
        <Box>
          <Typography id="honest" variant="h3" component="h2" sx={{ mb: 1 }}>What keeps it honest</Typography>
          <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { mb: 1 } }}>
            <li>Tokens, contrast data and the rules index are generated from the code on every build, so they can't drift apart.</li>
            <li>{pairs ? `${passing} of ${pairs.length} color pairs meet WCAG AA,` : 'Every color pair is checked against WCAG AA,'} and a token change that breaks one fails the build.</li>
            <li>A component without a rules file fails the build.</li>
            <li>A <code>CLAUDE.md</code> at the repo root tells coding assistants to read these rules before writing UI, and to run the rules check after.</li>
            <li>The MCP server has its own tests, which call every tool over the same connection an AI assistant uses.</li>
          </Box>
        </Box>
        <Box>
          <Typography variant="eyebrow">Where I'd take it next</Typography>
          <Measure as={Typography} sx={{ mt: 1 }}>
            A first evaluation is done: fresh agents built the same screens with and without these rules, and a checker scored them. See{' '}
            <Link href={href('system', 'evals')}>Evaluations</Link>. Next is running the
            evaluation with the MCP server connected, to see whether asking beats reading.
          </Measure>
        </Box>
      </Columns>
    </>
  );
}
