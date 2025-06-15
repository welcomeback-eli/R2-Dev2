import { registerMainProcessRemoteService } from '../../ipc/electron-browser/services.js';
import { IOllamaService } from '../common/ollama.js';

registerMainProcessRemoteService(IOllamaService, 'ollama');
