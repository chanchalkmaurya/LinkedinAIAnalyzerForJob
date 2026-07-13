import {
    TextareaHTMLAttributes,
    forwardRef,
} from "react";

interface JobDescriptionInputProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
    valueLength?: number;
    maxLength?: number;
}

const JobDescriptionInput = forwardRef<
    HTMLTextAreaElement,
    JobDescriptionInputProps
>(
    (
        {
            error,
            valueLength = 0,
            maxLength = 10000,
            ...props
        },
        ref
    ) => {
        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="job_description"
                        className="text-sm font-medium text-zinc-300"
                    >
                        Job Description
                    </label>

                    <span className="text-xs text-zinc-500">
                        {valueLength}/{maxLength}
                    </span>
                </div>

                <textarea
                    ref={ref}
                    id="job_description"
                    rows={10}
                    maxLength={maxLength}
                    placeholder="Paste the complete Job Description here..."
                    {...props}
                    className={`w-full resize-none rounded-xl border bg-zinc-900 px-4 py-3 text-white outline-none transition-all
                    ${
                        error
                            ? "border-red-500"
                            : "border-zinc-700 focus:border-blue-500"
                    }
                    placeholder:text-zinc-500
                    disabled:cursor-not-allowed
                    disabled:opacity-60`}
                />

                {error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

JobDescriptionInput.displayName = "JobDescriptionInput";

export default JobDescriptionInput;