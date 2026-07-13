from apps.common.services.openai_services import OPENAIServices
from apps.common.services.gemini_services import GeminiServices


class LLMService:
    """
    Picks a provider ("openai" or "gemini") and delegates
    generate() calls to it.
    """

    PROVIDERS = {
        "openai": OPENAIServices,
        "gemini": GeminiServices,
    }

    def __init__(self, service: str = "openai", model: str | None = None):
        provider_class = self.PROVIDERS.get(service)

        if provider_class is None:
            raise ValueError(
                f"Unknown LLM service '{service}'. "
                f"Valid options: {list(self.PROVIDERS.keys())}"
            )

        self.provider = provider_class(model) if model else provider_class()

    def generate(self, prompt: str) -> str:
        return self.provider.generate(prompt)
