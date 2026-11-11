import { Columns, Lead } from '@bensumet/edge';
import { Note, NumberedList, Opener } from '../../components/Layout';
import { DemoFrame } from '../../components/DemoFrame';

const decisions = [
  ['Filters come from the answer, not a fixed list.', 'Most filters appear only when the results have at least two values for them; a filter with one value filters nothing. Product stays as context even with one value, and Status gives way to Transaction where that says more. Try the four searches: the row of filters is different each time.'],
  ['Each search opens with the grouping that answers its question.', 'Your open tasks open grouped by due date, because the question is "what do I do first." Tasks, notes and emails for one account open grouped by record. A name search opens grouped by insured. A plain record search keeps the relevance order.'],
  ['The Group by menu says what each grouping is for.', 'Every option carries the question it answers ("what is pending on this policy or quote," "whose work is this"), so people can choose by intent instead of by field name.'],
  ['The record shows once, in the group header.', 'Grouped by record, the reference, account and overdue count move into the header instead of repeating on every task, note and email.'],
  ['"Interpreted as" shows how the AI read the query.', 'The search is AI-driven, so it shows its reading as chips before the results. If it misread the query, people see it immediately instead of trusting the wrong list.'],
  ['Every filtered view says what’s hidden.', 'A status line names the active filters and how many results they hide, and an empty result offers to clear them rather than leaving a blank page.'],
];

export function DeepSearchStudy() {
  return (
    <>
      <Opener eyebrow="Designing with AI · Working mockup" bold="Search filters" italic="that fit the answer.">
        <Lead opening="An AI search can return anything:">
          quotes, policies, claims, tasks, notes and emails, in any mix. A fixed row of filters would be wrong for most of those answers. I designed
          a results page whose filters and grouping adapt to what came back, as a working mockup made with an AI assistant, so the team could
          use it before committing to it.
        </Lead>
      </Opener>

      <DemoFrame src="deep-search.html" title="Deep Search Filters, the working mockup"
        note="The original mockup, with the product renamed. Switch the four searches at the top; clicking a result shows where it would open." />

      <NumberedList id="decisions" title="The decisions" items={decisions} />

      <Columns as="section" aria-label="Background" gap={4} sx={{ mt: 8 }}>
        <Note label="Where it started">
            The first version on the search results page was a row of chips for a few fixed categories; picking one filtered the results. It worked for
            simple searches and fell apart for mixed ones, because the chips never changed with the answer. I redesigned it around filter menus
            whose options come from the results themselves, and grouping chosen for the question each search was asking.
        </Note>
        <Note label="How AI shaped it">
            I used AI to work out how to design and group the information from what the search API actually returns, then prototyped each idea
            in code so the team could use it, not just look at it. We went through several rounds. The final version is the one shipping with the product.
        </Note>
      </Columns>
    </>
  );
}
