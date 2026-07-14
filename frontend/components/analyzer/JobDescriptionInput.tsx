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
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="job_description"
                        className="text-sm font-semibold text-zinc-200"
                    >
                        Job Description
                    </label>

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                        {valueLength}/{maxLength}
                    </span>
                </div>

                <textarea
                    ref={ref}
                    id="job_description"
                    rows={12}
                    maxLength={maxLength}
                    placeholder="Paste the complete job description here..."
                    {...props}
                    className={`
                        w-full
                        rounded-2xl
                        border
                        bg-zinc-950/60
                        px-5
                        py-5
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-zinc-500
                        ${
                            error
                                ? "border-red-500"
                                : "border-zinc-800 focus:border-blue-500"
                        }
                    `}
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

JobDescriptionInput.displayName =
    "JobDescriptionInput";

export default JobDescriptionInput;