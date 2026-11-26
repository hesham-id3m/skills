---
name: skill-lab
description: Evaluate and improve reusable Claude Code frontend skills using fixed test prompts, before/after benchmarks, visual quality scorecards and failure root-cause analysis. Use when intentionally updating skills, comparing v9 versus v10, or diagnosing repeated generation failures, not for ordinary project creation.
---

# Skill Lab — Evidence-based improvements

1. Snapshot the current skills and baseline output; establish 2–3 representative prompts from `evals/cases.json`.
2. Record the same model, stack, instructions, tool access and output requirements for baseline and candidate. Change one major variable at a time. Evaluate first-run and after-repair separately.
3. Measure: elapsed time, tool counts where available, number of regenerated scripts, build/browser passes, asset relevance/license gate, visual score (rubric `evals/SCORECARD.md`), functional acceptance criteria. Don't estimate timing from tool count.
4. Distinguish failure category: broken template, ineffective skill trigger, poor design, network/image retrieval, model/tool configuration, excessive context, or genuinely missing product requirement.
5. Modify only the responsible skill/tool/template; rerun the same tests. A longer skill is not automatically better; concise, testable instructions with black-box scripts are preferable.
6. Document improvements and regressions. Keep old baselines to verify quality didn't worsen.

Inspired by Anthropic's publicly available Agent Skills skill-creator/evaluation patterns; this is a new project-local adaptation, not their production evaluator.
