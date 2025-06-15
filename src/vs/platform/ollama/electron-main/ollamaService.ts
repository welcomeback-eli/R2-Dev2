import { IOllamaService } from '../common/ollama.js';
import { IRequestService, asTextOrError } from '../../request/common/request.js';
import { ILogService } from '../../log/common/log.js';
import { CancellationToken } from '../../../base/common/cancellation.js';

export class NativeOllamaService implements IOllamaService {
    declare readonly _serviceBrand: undefined;

    constructor(
        @IRequestService private readonly requestService: IRequestService,
        @ILogService private readonly logService: ILogService
    ) {}

    async start(): Promise<void> {
        try {
            await this.requestService.request({ url: 'http://127.0.0.1:11434/api/tags' }, CancellationToken.None);
            this.logService.info('[Ollama] service reachable');
        } catch (err) {
            this.logService.error('[Ollama] service not reachable', err);
        }
    }

    async generate(prompt: string): Promise<string> {
        try {
            const context = await this.requestService.request({
                type: 'POST',
                url: 'http://127.0.0.1:11434/api/generate',
                data: JSON.stringify({ model: 'llama2', prompt }),
                headers: { 'Content-Type': 'application/json' }
            }, CancellationToken.None);
            const result = await asTextOrError(context);
            return result ?? '';
        } catch (err) {
            this.logService.error('[Ollama] generate failed', err);
            throw err;
        }
    }
}
