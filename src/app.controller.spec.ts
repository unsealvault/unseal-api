import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'success',
      message: 'Unseal Backend Vault is running smoothly 📜',
      timestamp: new Date().toISOString(),
    };
  }
}