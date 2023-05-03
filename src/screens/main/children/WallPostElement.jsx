import React, {memo} from "react";
import "./WallPostElement.css"
import {Icon20LikeCircleFillRed, Icon20ViewCircleFillRed} from '@vkontakte/icons';
import {Icon20AdvertisingCircleFillRed} from '@vkontakte/icons';
import {Domains} from "../../../helpers/domains";
import dayjs from "dayjs";

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export const WallPostElement = memo(({post}) => {
    const history = post?.copy_history && post?.copy_history[0];

    const photoUrl = post?.attachments?.length
        && (post?.attachments[0]?.photo?.sizes?.find(e => e.type === "y" || e.type === "r" || e.type === "x")?.url
            || (history?.attachments[0]?.photo?.sizes?.at(-1).url))
    const videoImgUrl = post?.attachments?.length
        && (history?.attachments[0]?.video?.image?.at(-1)?.url)

    const postText = post?.text
    const historyText = history?.text
    const text = postText || historyText

    const date = dayjs(post.date * 1000).format("DD.MM HH:mm");

    const renderTextWithLinks = () => {
        return text && text.split(" ")
            .map((part, index) =>
                URL_REGEX.test(part) ?
                    <a href={part} target="_blank"
                       key={part + index} rel="noreferrer">{part}</a> : part + " "
            );
    }

    return (
        <div className="card">
            <img src={photoUrl
                || videoImgUrl
                || require("../../../resources/logo.jpeg")
            }
                 alt="card__image"
                 className="card__image"
                 width="600"
                 height="250"
            />
            <div className="card__body">
                <p className={"text"}>{renderTextWithLinks()}</p>
            </div>
            <div className="card__footer">
                <div>
                    <div className={"info-img"}>
                        <Icon20LikeCircleFillRed/>
                        <small className={"info-img-count"}>
                            {post.likes?.count || "0"}
                        </small>
                        <Icon20AdvertisingCircleFillRed/>
                        <small className={"info-img-count"}>
                            {post.reposts?.count || "0"}
                        </small>
                        <Icon20ViewCircleFillRed/>
                        <small className={"info-img-count"}>
                            {post.views?.count || "0"}
                        </small>
                    </div>
                    <div className={"info"}>
                        <small>{date}</small>
                        <a href={Domains.vk + "?w=wall"
                            + post.from_id + "_" + post.id} target="_blank"
                           rel="noopener noreferrer">
                            <button className="tag tag-green">Подробнее</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
})