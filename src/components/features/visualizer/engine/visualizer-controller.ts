import type { AlgorithmDefinition, ExecutionStep } from '../../../../problems/algorithms/types';
import { renderArray } from '../renderers/array-renderer';
import { renderHashMap, renderSet } from '../renderers/hashmap-renderer';
import { renderLinkedList } from '../renderers/linkedlist-renderer';
import { renderStack, renderQueue, renderDeque } from '../renderers/stack-queue-renderer';
import { renderTree, renderGraph } from '../renderers/tree-graph-renderer';
import { renderHeap, renderDPTable } from '../renderers/heap-dptable-renderer';

// Dynamic import map for algorithms when custom inputs are applied
const algorithmModules = import.meta.glob('../../../../problems/algorithms/*.ts');

export class VisualizerController {
  container: HTMLElement;
  problemId: string;
  meta: AlgorithmDefinition;
  steps: ExecutionStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speedMultiplier: number;
  timer: any;

  // DOM elements
  playPauseBtn: HTMLButtonElement;
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  scrubber: HTMLInputElement;
  stepCounterEl: HTMLElement;
  stepTitleEl: HTMLElement;
  stepDescEl: HTMLElement;
  codeLineWrapperEl: HTMLElement;
  codeLineEl: HTMLElement;
  variablesContainerEl: HTMLElement;
  canvasContainerEl: HTMLElement;
  customInputToggleBtn: HTMLButtonElement;
  customInputDrawerEl: HTMLElement;
  customInputFormEl: HTMLFormElement;
  customInputErrorEl: HTMLElement;
  speedBtns: NodeListOf<HTMLButtonElement>;

  constructor(container: HTMLElement) {
    this.container = container;
    this.problemId = container.dataset.problemId || '';

    // Parse JSON data embedded by server
    const dataScript = container.querySelector('.visualizer-data') as HTMLScriptElement;
    if (!dataScript || !dataScript.textContent) {
      throw new Error(`Visualizer data missing for problem ${this.problemId}`);
    }

    const parsedData = JSON.parse(dataScript.textContent);
    this.meta = parsedData.meta;
    this.steps = parsedData.steps || [];
    this.currentStepIndex = 0;
    this.isPlaying = false;
    this.speedMultiplier = 1;
    this.timer = null;

    // Grab elements
    this.playPauseBtn = container.querySelector('.viz-play-pause') as HTMLButtonElement;
    this.prevBtn = container.querySelector('.viz-prev') as HTMLButtonElement;
    this.nextBtn = container.querySelector('.viz-next') as HTMLButtonElement;
    this.resetBtn = container.querySelector('.viz-reset') as HTMLButtonElement;
    this.scrubber = container.querySelector('.viz-scrubber') as HTMLInputElement;
    this.stepCounterEl = container.querySelector('.viz-step-counter') as HTMLElement;
    this.stepTitleEl = container.querySelector('.viz-step-title') as HTMLElement;
    this.stepDescEl = container.querySelector('.viz-step-desc') as HTMLElement;
    this.codeLineWrapperEl = container.querySelector('.viz-code-line-wrapper') as HTMLElement;
    this.codeLineEl = container.querySelector('.viz-code-line') as HTMLElement;
    this.variablesContainerEl = container.querySelector('.viz-variables') as HTMLElement;
    this.canvasContainerEl = container.querySelector('.viz-canvases') as HTMLElement;
    this.customInputToggleBtn = container.querySelector('.viz-custom-input-toggle') as HTMLButtonElement;
    this.customInputDrawerEl = container.querySelector('.viz-custom-input-drawer') as HTMLElement;
    this.customInputFormEl = container.querySelector('.viz-custom-input-form') as HTMLFormElement;
    this.customInputErrorEl = container.querySelector('.viz-custom-input-error') as HTMLElement;
    this.speedBtns = container.querySelectorAll('.viz-speed-btn') as NodeListOf<HTMLButtonElement>;

    this.bindEvents();
    this.renderCurrentStep();
  }

  bindEvents() {
    this.playPauseBtn?.addEventListener('click', () => this.togglePlayPause());
    this.prevBtn?.addEventListener('click', () => this.stepBack());
    this.nextBtn?.addEventListener('click', () => this.stepForward());
    this.resetBtn?.addEventListener('click', () => this.reset());

    this.scrubber?.addEventListener('input', (e) => {
      const targetVal = Number((e.target as HTMLInputElement).value);
      this.goToStep(targetVal);
    });

    this.speedBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const speed = Number(btn.dataset.speed || 1);
        this.setSpeed(speed);
      });
    });

    this.customInputToggleBtn?.addEventListener('click', () => {
      this.toggleCustomInputDrawer();
    });

    this.customInputFormEl?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleCustomInputSubmit();
    });

    const resetDefaultsBtn = this.container.querySelector('.viz-reset-defaults-btn') as HTMLButtonElement;
    resetDefaultsBtn?.addEventListener('click', () => {
      this.populateDefaultInputs();
    });
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.currentStepIndex >= this.steps.length - 1) {
      this.currentStepIndex = 0;
    }
    this.isPlaying = true;
    this.updatePlayPauseButtonUI();

    const interval = Math.max(300, Math.floor(1000 / this.speedMultiplier));
    this.timer = setInterval(() => {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
        this.renderCurrentStep();
      } else {
        this.pause();
      }
    }, interval);
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.updatePlayPauseButtonUI();
  }

  updatePlayPauseButtonUI() {
    if (!this.playPauseBtn) return;
    if (this.isPlaying) {
      this.playPauseBtn.innerHTML = `
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>
        <span>Pause</span>
      `;
      this.playPauseBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
      this.playPauseBtn.classList.add('bg-amber-600', 'hover:bg-amber-500');
    } else {
      this.playPauseBtn.innerHTML = `
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <span>Play</span>
      `;
      this.playPauseBtn.classList.remove('bg-amber-600', 'hover:bg-amber-500');
      this.playPauseBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-500');
    }
  }

  stepBack() {
    this.pause();
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.renderCurrentStep();
    }
  }

  stepForward() {
    this.pause();
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.renderCurrentStep();
    }
  }

  reset() {
    this.pause();
    this.currentStepIndex = 0;
    this.renderCurrentStep();
  }

  goToStep(index: number) {
    this.pause();
    this.currentStepIndex = Math.max(0, Math.min(this.steps.length - 1, index));
    this.renderCurrentStep();
  }

  setSpeed(multiplier: number) {
    this.speedMultiplier = multiplier;
    this.speedBtns.forEach((btn) => {
      const btnSpeed = Number(btn.dataset.speed || 1);
      if (btnSpeed === multiplier) {
        btn.classList.add('bg-blue-600', 'text-white');
        btn.classList.remove('bg-gray-100', 'dark:bg-[#2d2d2d]', 'text-gray-700', 'dark:text-gray-300');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-gray-100', 'dark:bg-[#2d2d2d]', 'text-gray-700', 'dark:text-gray-300');
      }
    });

    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  toggleCustomInputDrawer() {
    if (!this.customInputDrawerEl) return;
    const isHidden = this.customInputDrawerEl.classList.contains('hidden');
    if (isHidden) {
      this.customInputDrawerEl.classList.remove('hidden');
      this.customInputToggleBtn?.classList.add('text-blue-600', 'dark:text-blue-400');
    } else {
      this.customInputDrawerEl.classList.add('hidden');
      this.customInputToggleBtn?.classList.remove('text-blue-600', 'dark:text-blue-400');
    }
  }

  populateDefaultInputs() {
    if (!this.customInputFormEl) return;
    this.meta.inputSchema.forEach((schema) => {
      const inputEl = this.customInputFormEl.elements.namedItem(schema.name) as HTMLInputElement;
      if (inputEl) {
        if (schema.type === 'number-array' || schema.type === 'string-array') {
          inputEl.value = Array.isArray(schema.defaultValue)
            ? schema.defaultValue.join(', ')
            : String(schema.defaultValue);
        } else {
          inputEl.value = String(schema.defaultValue);
        }
      }
    });
  }

  async handleCustomInputSubmit() {
    if (!this.customInputFormEl) return;
    this.pause();

    try {
      const formData = new FormData(this.customInputFormEl);
      const parsedInputs: Record<string, any> = {};

      for (const schema of this.meta.inputSchema) {
        const rawVal = formData.get(schema.name);
        if (rawVal === null || rawVal === undefined) continue;
        const strVal = String(rawVal).trim();

        if (schema.type === 'number') {
          const num = Number(strVal);
          if (isNaN(num)) throw new Error(`Field '${schema.label}' must be a valid number`);
          parsedInputs[schema.name] = num;
        } else if (schema.type === 'number-array') {
          const nums = strVal
            .split(',')
            .map((v) => Number(v.trim()))
            .filter((v) => !isNaN(v));
          if (nums.length === 0) throw new Error(`Field '${schema.label}' must contain at least 1 number`);
          parsedInputs[schema.name] = nums;
        } else if (schema.type === 'string-array') {
          const arr = strVal
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);
          if (arr.length === 0) throw new Error(`Field '${schema.label}' must contain at least 1 item`);
          parsedInputs[schema.name] = arr;
        } else {
          parsedInputs[schema.name] = strVal;
        }
      }

      // Load problem module dynamically
      const path = `../../../../problems/algorithms/${this.problemId}.ts`;
      const moduleLoader = algorithmModules[path];
      if (!moduleLoader) {
        throw new Error(`Algorithm module for '${this.problemId}' not found.`);
      }

      const mod = (await moduleLoader()) as any;
      const algoDef = mod.default || mod[Object.keys(mod)[0]];
      const newSteps: ExecutionStep[] = algoDef.generateSteps(parsedInputs);

      if (!newSteps || newSteps.length === 0) {
        throw new Error('Algorithm generated no steps for the given inputs.');
      }

      this.steps = newSteps;
      this.currentStepIndex = 0;
      this.scrubber.max = String(this.steps.length - 1);
      this.scrubber.value = '0';

      if (this.customInputErrorEl) {
        this.customInputErrorEl.classList.add('hidden');
        this.customInputErrorEl.textContent = '';
      }

      this.toggleCustomInputDrawer();
      this.renderCurrentStep();
    } catch (err: any) {
      if (this.customInputErrorEl) {
        this.customInputErrorEl.classList.remove('hidden');
        this.customInputErrorEl.textContent = err.message || 'Invalid inputs provided.';
      }
    }
  }

  renderCurrentStep() {
    if (!this.steps || this.steps.length === 0) return;

    const step = this.steps[this.currentStepIndex];
    const totalSteps = this.steps.length;

    // Scrubber & Step counter
    if (this.scrubber) {
      this.scrubber.max = String(totalSteps - 1);
      this.scrubber.value = String(this.currentStepIndex);
    }
    if (this.stepCounterEl) {
      this.stepCounterEl.textContent = `Step ${this.currentStepIndex + 1} of ${totalSteps}`;
    }

    // Prev / Next button disabled state
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentStepIndex === 0;
      this.prevBtn.classList.toggle('opacity-40', this.currentStepIndex === 0);
      this.prevBtn.classList.toggle('cursor-not-allowed', this.currentStepIndex === 0);
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentStepIndex === totalSteps - 1;
      this.nextBtn.classList.toggle('opacity-40', this.currentStepIndex === totalSteps - 1);
      this.nextBtn.classList.toggle('cursor-not-allowed', this.currentStepIndex === totalSteps - 1);
    }

    // Step Title & Description
    if (this.stepTitleEl) {
      this.stepTitleEl.textContent = step.title || `Step ${this.currentStepIndex + 1}`;
    }
    if (this.stepDescEl) {
      this.stepDescEl.textContent = step.description;
    }

    // Code line
    if (this.codeLineWrapperEl && this.codeLineEl) {
      if (step.codeLine) {
        this.codeLineWrapperEl.classList.remove('hidden');
        this.codeLineEl.textContent = step.codeLine;
      } else {
        this.codeLineWrapperEl.classList.add('hidden');
      }
    }

    // Variables
    if (this.variablesContainerEl) {
      if (step.variables && Object.keys(step.variables).length > 0) {
        this.variablesContainerEl.innerHTML = Object.entries(step.variables)
          .map(
            ([k, v]) => `
            <div class="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-[#252526] border border-gray-200 dark:border-gray-800 flex items-center gap-1.5 text-xs font-mono">
              <span class="text-gray-500 dark:text-gray-400 font-semibold">${k}:</span>
              <span class="text-gray-800 dark:text-gray-100 font-bold">${Array.isArray(v) ? JSON.stringify(v) : v}</span>
            </div>
          `
          )
          .join('');
        this.variablesContainerEl.classList.remove('hidden');
      } else {
        this.variablesContainerEl.innerHTML = '';
        this.variablesContainerEl.classList.add('hidden');
      }
    }

    // Canvases
    if (this.canvasContainerEl) {
      let canvasHtml = '';

      if (step.arrays) {
        canvasHtml += renderArray(step.arrays);
      } else if (step.array) {
        canvasHtml += renderArray(step.array);
      }
      if (step.hashmap) {
        canvasHtml += renderHashMap(step.hashmap);
      }
      if (step.set) {
        canvasHtml += renderSet(step.set);
      }
      if (step.linkedList) {
        canvasHtml += renderLinkedList(step.linkedList);
      }
      if (step.stack) {
        canvasHtml += renderStack(step.stack);
      }
      if (step.queue) {
        canvasHtml += renderQueue(step.queue);
      }
      if (step.deque) {
        canvasHtml += renderDeque(step.deque);
      }
      if (step.tree) {
        canvasHtml += renderTree(step.tree);
      }
      if (step.graph) {
        canvasHtml += renderGraph(step.graph);
      }
      if (step.heap) {
        canvasHtml += renderHeap(step.heap);
      }
      if (step.dpTable) {
        canvasHtml += renderDPTable(step.dpTable);
      }

      this.canvasContainerEl.innerHTML = canvasHtml;
    }
  }

  destroy() {
    this.pause();
  }
}

