<?php

namespace Kwam\KwamBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Post
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Kwam\KwamBundle\Entity\PostRepository")
 */
class Post
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     */
    private $userId;

    /**
     * @var integer
     *
     * @ORM\Column(name="kwam_id", type="integer")
     */
    private $kwamId;

    /**
     * @var string
     *
     * @ORM\Column(name="message_type", type="string", length=255)
     */
    private $messageType;

    /**
     * @var string
     *
     * @ORM\Column(name="message", type="text")
     */
    private $message;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     * @return Post
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer 
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set kwamId
     *
     * @param integer $kwamId
     * @return Post
     */
    public function setKwamId($kwamId)
    {
        $this->kwamId = $kwamId;

        return $this;
    }

    /**
     * Get kwamId
     *
     * @return integer 
     */
    public function getKwamId()
    {
        return $this->kwamId;
    }

    /**
     * Set messageType
     *
     * @param string $messageType
     * @return Post
     */
    public function setMessageType($messageType)
    {
        $this->messageType = $messageType;

        return $this;
    }

    /**
     * Get messageType
     *
     * @return string 
     */
    public function getMessageType()
    {
        return $this->messageType;
    }

    /**
     * Set message
     *
     * @param string $message
     * @return Post
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get message
     *
     * @return string 
     */
    public function getMessage()
    {
        return $this->message;
    }
}
