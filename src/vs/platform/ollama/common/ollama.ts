import { createDecorator } from '../../instantiation/common/instantiation.js';

export const IOllamaService = createDecorator<IOllamaService>('ollamaService');

export interface IOllamaService {
    readonly _serviceBrand: undefined;

    start(): Promise<void>;
    generate(prompt: string): Promise<string>;
}
