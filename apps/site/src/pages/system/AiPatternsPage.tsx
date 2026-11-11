import { useState } from 'react';
import {
  Box, Button, Stack, TextField, Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Lead } from '@bensumet/edge';
import { PageHero } from '@bensumet/edge';
import { EdgeCard, StitchDivider } from '@bensumet/edge';
import { AiLabel } from '@bensumet/edge';
import { StreamingText } from '@bensumet/edge';
import { SuggestionList } from '@bensumet/edge';
import { SummaryCard } from '@bensumet/edge';
import { Measure } from '@bensumet/edge';

function Pattern({ id, title, principle, children }: { id: string; title: string; principle: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <Typography id={id} variant="h3" component="h2" sx={{ mb: 1 }}>{title}</Typography>
      <Measure as={Typography} color="text.secondary" sx={{ mb: 2.5 }}>{principle}</Measure>
      {children}
    </section>
  );
}

const description =
  'orders-api now retries a failed payment capture once, after two seconds, before it marks the order as failed. ' +
  'Order lookups by customer email are faster because the query uses the new index. The admin export includes ' +
  'refunds, and dates in the export are in the store’s time zone instead of UTC. No action is needed; the ' +
  'change is live in production and staging.';

const commits = [
  ['a41c9e2', 'Retry payment capture once before failing'],
  ['9be03d1', 'Index orders by customer email'],
  ['77f2c4a', 'Include refunds in the admin export'],
  ['5d1e8b0', 'Use the store time zone in exports'],
];

function CaptionEditor() {
  const draft = 'Payments retry once before failing, email lookups are faster, and the admin export now includes refunds.';
  const [value, setValue] = useState(draft);
  const [saved, setSaved] = useState(false);
  const edited = value !== draft;

  return (
    <EdgeCard sx={{ p: 0 }}>
      <Grid container>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 3, height: '100%', bgcolor: 'edge.raised', borderRight: { md: 1 }, borderBottom: { xs: 1, md: 0 }, borderColor: 'divider' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>Commits in this deploy</Typography>
            <Stack component="ul" spacing={1.25} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {commits.map(([sha, msg]) => (
                <li key={sha}>
                  <Typography variant="mono" color="text.secondary">{sha}</Typography>
                  <Typography variant="body2">{msg}</Typography>
                </li>
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h4" component="h3" sx={{ mr: 'auto' }}>Release note, orders-api</Typography>
              {edited ? <Typography variant="body2" color="text.secondary">Edited by you</Typography> : <AiLabel />}
            </Stack>
            <TextField
              multiline
              minRows={3}
              label="Release note"
              value={value}
              onChange={(e) => { setValue(e.target.value); setSaved(false); }}
              helperText={`${value.length} / 160 characters`}
              slotProps={{ htmlInput: { maxLength: 160 } }}
            />
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={() => setSaved(true)}>Publish note</Button>
              <Button onClick={() => { setValue(draft); setSaved(false); }} disabled={!edited}>Revert to draft</Button>
            </Stack>
            <Typography variant="body2" color="text.secondary" role="status">{saved && 'Release note published to the changelog.'}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </EdgeCard>
  );
}

export function AiPatternsPage() {
  return (
    <Stack spacing={6}>
      <Box>
        <PageHero folio="four" label="Machine" bold="AI that shows" italic="its work.">
          <Lead opening="Four patterns">
            for putting AI output in front of people. The rules are the same in each: label what the machine wrote,
            show where it came from, keep the person in control, and make it easy to say “that’s wrong.” Everything
            here runs on mock data.
          </Lead>
        </PageHero>
      </Box>

      <Pattern id="summary" title="Summary with sources" principle="A summary is only as useful as it is checkable. Each point cites the message it came from, and the sources open in place.">
        <SummaryCard
          title="Failed deploy, queue-worker"
          points={[
            { text: 'The build ran out of memory while compiling, so the deploy stopped.', sources: ['l1'] },
            { text: 'The previous version is still serving traffic; nothing is down.', sources: ['l2'] },
            { text: 'It started after the dependency upgrade in a41c9e2, which doubled the build’s memory use.', sources: ['l1', 'm1'] },
          ]}
          sources={[
            { id: 'l1', label: 'Build log, 2:14 PM', excerpt: 'FATAL ERROR: Reached heap limit. Allocation failed. Build failed after 2m 14s.' },
            { id: 'l2', label: 'Deploy event, 2:14 PM', excerpt: 'Deploy canceled. Rolling back is not needed; the live version was not replaced.' },
            { id: 'm1', label: 'Metrics, last 7 builds', excerpt: 'Peak build memory: 410 MB before a41c9e2, 830 MB after.' },
          ]}
        />
      </Pattern>

      <StitchDivider aria-hidden="true" />

      <Pattern id="suggestions" title="Recommendations you approve" principle="Suggestions explain their reasoning and change nothing until accepted. Dismissing one can be undone.">
        <Typography variant="h4" component="h3" sx={{ mb: 2 }}>Fixes for the failed queue-worker build</Typography>
        <SuggestionList
          suggestions={[
            { id: 's1', title: 'Move the build to a larger instance', reason: 'The build peaks at 830 MB and the current instance allows 512 MB. The next size up allows 2 GB for about $7 more a month.' },
            { id: 's2', title: 'Raise the Node memory limit for the build step', reason: 'Free and quick to try, but it only helps if the instance has memory to spare; this one doesn’t, so it may fail again.' },
            { id: 's3', title: 'Pin the previous dependency version', reason: 'Undoes the change that doubled memory use. Safe for now, but it postpones the upgrade.' },
          ]}
        />
      </Pattern>

      <StitchDivider aria-hidden="true" />

      <Pattern id="streaming" title="Streaming with Stop" principle="Long drafts appear as they are written, and the person can stop at any point and keep what is there. Screen readers hear one announcement when it finishes, not every word.">
        <EdgeCard sx={{ p: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h4" component="h3" sx={{ mr: 'auto' }}>Release summary, orders-api v2.4</Typography>
            <AiLabel />
          </Stack>
          <StreamingText text={description} placeholder="Press Generate to draft a summary of this release from its commits." />
        </EdgeCard>
      </Pattern>

      <StitchDivider aria-hidden="true" />

      <Pattern id="editable" title="Drafts you can own" principle="An AI draft is a starting point. Once someone edits it, the AI label steps aside, and the original is one click away.">
        <CaptionEditor />
      </Pattern>
    </Stack>
  );
}
